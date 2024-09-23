const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yearDataSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { collection: 'yearly_totals' }); // Explicitly specify the collection name here

const YearData = mongoose.model('YearData', yearDataSchema);

module.exports = YearData;
