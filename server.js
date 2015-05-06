'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

var mongoose = require('mongoose');

// Load the environment config
var config = require(
  './config/' + (process.ENV || 'development')
);

// Set up mongodb connection
mongoose.connect(config.db);

// Set server connection port
server.connection({
  port: (config.port || 4000)
});

// Require the models
require('./api/models/user');
require('./api/models/quote');

// Auth
require('./api/routes/auth')(server);
// Users
require('./api/routes/users')(server);
// Quotes
require('./api/routes/quotes')(server);

// Log were the serve is listening
server.start(function() {
  console.log('Server running at:', server.info.uri);
});
