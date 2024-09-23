const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monthDataSchema = new Schema({
    item_name : {
        type: String,
        required: true
    },
    month : {
        type : String,
        required : true
    },
    total : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    userId : {
        type : String,
        required : true
    }
}, {collection : 'monthly_totals'});

const MonthData = mongoose.model('MonthData',monthDataSchema)

module.exports = MonthData;