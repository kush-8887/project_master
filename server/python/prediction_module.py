import os
import pandas as pd
from prophet import Prophet
import logging
from io import StringIO

log_stream = StringIO()
logging.basicConfig(stream=log_stream)


class prediction_module:
    def __init__(self, userId, product):
        self.userId = userId
        self.product = product

    def fetch_product_total(self):
        try:
            # File paths
            # input_file = f'server/public/uploads/{self.userId}.csv'
            # output_file = f'server/public/modified/{self.userId}_m.csv'
            input_file = f'public/uploads/{self.userId}.csv'
            output_file = f'public/modified/{self.userId}_m.csv'

            abs_input_file = os.path.abspath(input_file)
            abs_output_file = os.path.abspath(output_file)

            # Check if the input file exists
            if not os.path.exists(abs_input_file):
                raise FileNotFoundError(f"{abs_input_file} does not exist.")

            # Read the CSV into a pandas DataFrame
            df = pd.read_csv(abs_input_file)

            # Convert all column names to lowercase for case-insensitive handling
            df.columns = df.columns.str.lower()

            # Check if 'total' column exists after normalization
            if 'total' not in df.columns:
                raise KeyError(f"'total' column not found in the file.")

            # Case-insensitive filtering for product name, stripping spaces
            filtered_df = df[df['item_name'].str.strip().str.lower() == self.product.strip().lower()][['date', 'total']]

            # Rename columns 'date' to 'ds' and 'total' to 'y'
            filtered_df = filtered_df.rename(columns={'date': 'ds', 'total': 'y'})

            # If the output file exists, delete it
            if os.path.exists(abs_output_file):
                os.remove(abs_output_file)

            # Save the new filtered DataFrame as a CSV
            filtered_df.to_csv(abs_output_file, index=False)

            return "success"
        except Exception as e:
            print(e)
            return "P01"

    def fetch_product_quantity(self):
        try:
            # File paths
            input_file = f'public/uploads/{self.userId}.csv'
            output_file = f'public/modified/{self.userId}_m.csv'
            # input_file = f'server/public/uploads/{self.userId}.csv'
            # output_file = f'server/public/modified/{self.userId}_m.csv'

            abs_input_file = os.path.abspath(input_file)
            abs_output_file = os.path.abspath(output_file)

            # Check if the input file exists
            if not os.path.exists(abs_input_file):
                raise FileNotFoundError(f"{abs_input_file} does not exist.")

            # Read the CSV into a pandas DataFrame
            df = pd.read_csv(abs_input_file)

            # Convert all column names to lowercase for case-insensitive handling
            df.columns = df.columns.str.lower()

            # Check if 'quantity' column exists after normalization
            if 'quantity' not in df.columns:
                raise KeyError(f"'quantity' column not found in the file.")

            # Case-insensitive filtering for product name, stripping spaces
            filtered_df = df[df['item_name'].str.strip().str.lower() == self.product.strip().lower()][['date', 'quantity']]

            # Rename columns 'date' to 'ds' and 'quantity' to 'y'
            filtered_df = filtered_df.rename(columns={'date': 'ds', 'quantity': 'y'})

            # If the output file exists, delete it
            if os.path.exists(abs_output_file):
                os.remove(abs_output_file)

            # Save the new filtered DataFrame as a CSV
            filtered_df.to_csv(abs_output_file, index=False)

            return "success"
        except Exception as e:
            # Print the exception for debugging
            # print(e)
            return "P02"
    def predict_next_year(self):
        try:
            # File path for the modified CSV file
            input_file = f'public/modified/{self.userId}_m.csv'
            abs_input_file = os.path.abspath(input_file)

            # Check if the file exists
            if not os.path.exists(abs_input_file):
                raise FileNotFoundError(f"{abs_input_file} does not exist.")

            # Read the CSV file
            df = pd.read_csv(abs_input_file)

            # Initialize Prophet model
            model = Prophet()
            model.fit(df)

            # Create a dataframe with future dates for the next year (365 days)
            future = model.make_future_dataframe(periods=730)

            # Forecast
            forecast = model.predict(future)

            # Extract required columns (date and yhat for predictions)
            forecast_df = forecast[['ds', 'yhat']]

            # Convert the date column to datetime and extract the month
            forecast_df['ds'] = pd.to_datetime(forecast_df['ds'])
            forecast_df['month'] = forecast_df['ds'].dt.to_period('M')

            # Group by month and sum the predictions for each month
            monthly_forecast = forecast_df.groupby('month').agg({'yhat': 'sum'}).reset_index()

            # Prepare the data for Nivo chart format (month-year as x and summed yhat as y)
            nivo_data = {
                "id": self.product,
                "data": [
                    {"x": row['month'].strftime('%Y-%m'), "y": round(row['yhat'], 2)}
                    for _, row in monthly_forecast.iterrows()
                ]
            }
            return [nivo_data]

        except Exception as e:
            print(f"Error: {e}")
            return "P03"
    # def predict_next_year(self):
    #     try:
    #         # File path for the modified CSV file
    #         input_file = f'public/modified/{self.userId}_m.csv'
    #         # input_file = f'server/public/modified/{self.userId}_m.csv'
    #         abs_input_file = os.path.abspath(input_file)

    #         # Check if the file exists
    #         if not os.path.exists(abs_input_file):
    #             raise FileNotFoundError(f"{abs_input_file} does not exist.")

    #         # Read the CSV file
    #         df = pd.read_csv(abs_input_file)

    #         # Initialize Prophet model
    #         model = Prophet()
    #         model.fit(df)

    #         # Create a dataframe with future dates for the next year (365 days)
    #         future = model.make_future_dataframe(periods=365)

    #         # Forecast
    #         forecast = model.predict(future)

    #         # Extract required columns (date and yhat for predictions)
    #         forecast_df = forecast[['ds', 'yhat']]

    #         # Prepare the data for Nivo chart format
    #         nivo_data = {
    #             "id": self.product,
    #             "data": [
    #                 {"x": row['ds'].strftime('%Y-%m-%d'), "y": round(row['yhat'], 2)}
    #                 for _, row in forecast_df.iterrows()
    #             ]
    #         }
    #         return [nivo_data]

    #     except Exception as e:
    #         print(f"Error: {e}")
    #         return "P03"