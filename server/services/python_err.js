function get_err(errorCode){      
    const error_msgs = {
        "C01" : "Invalid column names. ERROR CODE: C01",
        "C02" : "Error in modifying the CSV. ERROR CODE: C02",
        "C03" : "Error in uploading to Database. ERROR CODE: C03"
    }
    const msg = error_msgs[errorCode];

    if (msg) {
       return msg;
    } else {
        return "Unknown error occured!"
    }
}

module.exports = {get_err};