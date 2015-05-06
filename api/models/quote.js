'use strict';

var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var QuoteSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

QuoteSchema.statics.random = function random(cb) {
  this.count(function count(err, count) {
    if (err) cb(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
};

exports = mongoose.model('Quote', QuoteSchema);
