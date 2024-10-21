import prediction_module as pm
import sys
import json  # Import json for easier formatting of the output
import logging
from io import StringIO

log_stream = StringIO()
logging.basicConfig(stream=log_stream)

def myFunc(userId, product, operation):
    pm_mod = pm.prediction_module(userId, product)
    pre = None

    if operation == "price":
        res = pm_mod.fetch_product_total()
        if res == "P01":
            return res
        pre = pm_mod.predict_next_year()

    elif operation == "quantity":
        res = pm_mod.fetch_product_quantity()
        if res == "P02":
            return res
        pre = pm_mod.predict_next_year()

    # Ensure pre is a list and format it as JSON for output
    if pre is not None:
        return json.dumps(pre)  # Return only the pre array as a JSON string
    else:
        return "No predictions made."

if __name__ == '__main__':
    userId = sys.argv[1]
    product = sys.argv[2]
    operation = sys.argv[3]
    # userId = "66f10a130e58cd7c0b512d6c"
    # product = "apple"
    # operation = "price"
    result = myFunc(userId, product, operation)
    # print(type(result))
    print(result)  # Print the result to stdout