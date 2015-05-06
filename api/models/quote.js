'use strict';

var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var QuoteSchema = new Schema({
  author: String,
  text: String,
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: Date,
  updatedAt: Date
});

exports = mongoose.model('Quote', QuoteSchema);
