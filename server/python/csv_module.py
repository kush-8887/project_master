import pandas as pd
from pymongo import MongoClient

class csv_module:
    def __init__(self, userId, csv_file, mongo_url, db_name):
        self.userId = userId
        self.csv_file = csv_file
        self.mongo_url = mongo_url
        self.db_name = db_name

    # Method to check the CSV format
    def check_columns(self):
        try:
            df = pd.read_csv(self.csv_file)        
            # Get heads of csv file and match
            headers = df.columns.values
            headers_lower = [header.lower() for header in headers]

            required_headers = ["date", "item_name", "quantity", "price", "total"]

            if all(header.lower() in headers_lower for header in required_headers):
                return "All required columns are present."
            else:
                raise Exception("C01")
        except Exception as e:
            return f"{e}"
    
    # Method to format data into a new CSV
    def modify_csv(self):
        try:
            df = pd.read_csv(self.csv_file)

            # Convert 'date' column to datetime with the correct format
            df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y', errors='coerce')

            # Add a column for month, quarter, and year
            df['month'] = df['date'].dt.to_period('M').astype(str)  # Convert to string after deriving
            df['quarter'] = df['date'].dt.to_period('Q').astype(str)  # Convert to string after deriving
            df['year'] = df['date'].dt.to_period('Y').astype(str)  # Convert to string after deriving

            # Save the modified DataFrame back to the original CSV file or a new file
            df.to_csv(self.csv_file, index=False)  # Overwrite the original file

            return "CSV modified"
        except Exception as e:
            print(f"Error in modify_csv: {e}")
            return "C02"

    def format_data(self):
        try:
            # Read the modified CSV file
            df = pd.read_csv(self.csv_file)

            # Check for NaN values and handle them (optional but recommended)
            df['month'] = df['month'].replace({pd.NaT: None})
            df['quarter'] = df['quarter'].replace({pd.NaT: None})
            df['year'] = df['year'].replace({pd.NaT: None})

            # Convert month, quarter, and year columns to strings
            df['month'] = df['month'].astype(str)
            df['quarter'] = df['quarter'].astype(str)
            df['year'] = df['year'].astype(str)

            # Connect to MongoDB
            client = MongoClient(self.mongo_url)
            db = client[self.db_name]

            # Clear previous data for this user in MongoDB collections (optional)
            db['raw_sales'].delete_many({"userId": self.userId})
            db['monthly_totals'].delete_many({"userId": self.userId})
            db['quarterly_totals'].delete_many({"userId": self.userId})
            db['yearly_totals'].delete_many({"userId": self.userId})

            # Calculate monthly, quarterly, and yearly totals
            monthly_totals = df.groupby(['item_name', 'month']).agg({'total': 'sum', 'quantity': 'sum'}).reset_index()
            quarterly_totals = df.groupby(['item_name', 'quarter']).agg({'total': 'sum', 'quantity': 'sum'}).reset_index()
            yearly_totals = df.groupby(['item_name', 'year']).agg({'total': 'sum', 'quantity': 'sum'}).reset_index()

            # Convert month, quarter, and year columns to strings in the grouped data as well
            monthly_totals['month'] = monthly_totals['month'].astype(str)
            quarterly_totals['quarter'] = quarterly_totals['quarter'].astype(str)
            yearly_totals['year'] = yearly_totals['year'].astype(str)

            # Add userId to the total dataframes
            monthly_totals['userId'] = self.userId
            quarterly_totals['userId'] = self.userId
            yearly_totals['userId'] = self.userId

            # Convert data to dictionaries and add userId key
            raw_data_dict = df.to_dict(orient='records')
            for record in raw_data_dict:
                record['userId'] = self.userId

            # Insert data into MongoDB
            db['raw_sales'].insert_many(raw_data_dict)
            db['monthly_totals'].insert_many(monthly_totals.to_dict(orient='records'))
            db['quarterly_totals'].insert_many(quarterly_totals.to_dict(orient='records'))
            db['yearly_totals'].insert_many(yearly_totals.to_dict(orient='records'))

            # Extract unique values for months, quarters, and years
            unique_months = df['month'].unique().tolist()
            unique_quarters = df['quarter'].unique().tolist()
            unique_years = df['year'].unique().tolist()

            # Create a dictionary for user-specific unique values
            user_data = {
                "userId": self.userId,
                "months": unique_months,
                "quarters": unique_quarters,
                "years": unique_years
            }

            # Store the unique values in MongoDB in a separate collection
            db['time_data'].replace_one({"userId": self.userId}, user_data, upsert=True)

            # Close the MongoDB connection
            client.close()

            return "Data successfully formatted and uploaded to MongoDB"
        except Exception as e:
            print(f"Error in format_data: {e}")
            return "C03"

        