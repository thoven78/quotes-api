'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
});

exports = mongoose.model('User', UserSchema);
