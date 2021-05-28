let mongoose = require('../db');
const Schema = mongoose.Schema;



const leaveSchema = new Schema({

  leaveDiscription: {
    type: String

  },
  empId: {
    type: String,
    require: true

  },
  leaveType: {
    type: String,
    require: true

  },
  leaveID: {
    type: String,
    require: true
  },
  fromDate: {
    type: Date,
    require: true

  },
  toDate: {
    type: Date,
    require: true

  }, 
  status: {
    type: String,
    default: "pending"

  },

});

module.exports = mongoose.model('leave', leaveSchema);

