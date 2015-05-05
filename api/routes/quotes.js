'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

var quotes = require('../models/quote').quotes;

server.connection({
  port: 4000
});

server.route({
  method: 'GET',
  path: '/api/quotes',
  handler: function(request, reply) {
    reply(quotes);
  }
});

server.route({
  method: 'GET',
  path: '/api/quotes/random',
  handler: function(request, reply) {
    reply(quotes[Math.floor(Math.random() * quotes.length)]);
  }
});

server.route({
  method: 'GET',
  path: '/api/quotes/{id}',
  handler: function(request, reply) {
    var quote = (quotes[+request.params.id - 1] || {});
    if (quote.author) {
      reply(quote);
    } else {
      reply('No quote found').code(404);
    }
  }
});

server.route({
  method: 'POST',
  path: '/api/quotes',
  handler: function(request, reply) {
    console.log(request.payload);
    reply('Not yet impleted');
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
