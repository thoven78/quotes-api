'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  displayName: String,
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    //required: true
  },
  avatarUrl: String,
  token: String,
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

exports = mongoose.model('User', UserSchema);
