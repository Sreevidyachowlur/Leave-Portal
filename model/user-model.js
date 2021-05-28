let mongoose = require('../db');
const Schema = mongoose.Schema;
const constant = require('../utils/constant');
// const CONSTANT = require('../utils/constant');

const userSchema = new Schema({
  name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    trim: true, 
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    default: ''
  },
  dob: {
    type: Date,
    default: Date.now(),

  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: String,
    enum: constant.ROLE,
    required: true

  },
  empId: {
    type: String,
    require: true

  },
  password: {
    type: String,
    require: true

  },
  leaveCount: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model('users', userSchema);