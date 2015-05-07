'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

// Load the environment config
var config = require(
  './config/' + (process.ENV || 'development')
);

// Load mongodb connection
require('./api/db/mongo');

// Set server connection port
server.connection({
  port: (config.port || 4000)
});

// Require the models
require('./api/models/user');
require('./api/models/quote');

// Auth components
require('./api/components/auth')(server, config);

// Auth Routes
require('./api/routes/auth')(server);
// Users
require('./api/routes/users')(server);
// Quotes
require('./api/routes/quotes')(server);

// Log were the serve is listening
server.start(function start() {
  console.log('Server running at:', server.info.uri);
});
