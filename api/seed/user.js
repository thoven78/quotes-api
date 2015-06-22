'use strict';

// Load the environment config
var config = require(
  './config/' + (process.ENV || 'development')
);

// Load mongodb connection
require('./api/db/mongo')(config);

/**
 * User
 * @type {Object}
 */
var User = require('./api/models/user');
