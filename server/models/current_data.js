const mongoose = require('mongoose');

const currentDataSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  months: {
    type: [String],
    required: true
  },
  quarters: {
    type: [String],
    required: true
  },
  years: {
    type: [String],
    required: true
  }
}, {
  collection: 'time_data'
});

const CurrentData = mongoose.model('CurrentData', currentDataSchema);

module.exports = CurrentData;
