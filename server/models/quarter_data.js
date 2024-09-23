const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quarterDataSchema = new Schema({
    item_name : {
        type: String,
        required: true
    },
    quarter : {
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
}, {collection : 'quarterly_totals'});

const QuarterData = mongoose.model('QuarterData',quarterDataSchema)

module.exports = QuarterData;