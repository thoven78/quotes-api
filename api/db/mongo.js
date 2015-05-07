'use strict';

var mongoose = require('mongoose');

module.exports = function mongoConnection(config) {
  // Set up mongodb connection
  var connection = mongoose.connect(config.db);
  // TODO catch connection errors
};
