import sys
import os
import csv_module as c

def myFun(userId, directory_path, mongo_url, db_name):
    # Check if the directory exists
    if not os.path.exists(directory_path):
        sys.stdout.write(f"Error: {directory_path} does not exist.\n")
        sys.stdout.flush()
        return

    # Search for a CSV file in the directory
    csv_file = None
    for file_name in os.listdir(directory_path):
        if file_name.endswith('.csv'):
            csv_file = os.path.join(directory_path, file_name)
            break

    if not csv_file:
        sys.stdout.write("Error: No CSV file found in the directory.\n")
        sys.stdout.flush()
        return

    # Create an instance of csv_module
    csvMod = c.csv_module(userId, csv_file, mongo_url, db_name)
    
    # Call check_columns without arguments
    res = csvMod.check_columns()
    if res != "All required columns are present.":
        sys.stdout.write(res + "\n")
        sys.stdout.flush()
        return res
    
    # Modify CSV to desired format
    res2 = csvMod.modify_csv()
    if res2 == "C02":
        sys.stdout.write(res2 + "\n")
        sys.stdout.flush()
        return
    
    # Format data and upload to MongoDB
    res3 = csvMod.format_data()
    if res3 == "C03":
        sys.stdout.write(res3 + "\n")
        sys.stdout.flush()
        return
    
    # If everything was successful, print success message
    sys.stdout.write("File processed successfully\n")
    sys.stdout.flush()
    return 0

if __name__ == '__main__':
    # Capture the user_id from the command line arguments passed by Node.js
    user_id = sys.argv[1]
    storagePath = sys.argv[2]
    mongoURL = sys.argv[3]
    dbName = sys.argv[4]

    # Call the function with user_id
    myFun(user_id, storagePath, mongoURL, dbName)
