'use strict';

var Joi = require('joi');

var quotes = []; //require('../models/quote').quotes;

var Quote = require('mongoose').model('Quote');

module.exports = function quotes(server) {

  server.route({
    method: 'GET',
    path: '/api/quotes',
    handler: function(request, reply) {
      Quote.find(function(err, docs) {
        if (err) {
          return err;
        }
        reply({
          quotes: docs
        });
      });
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

      if (!request.auth.isAuthenticated) {
        return reply({
          message: 'Not logged in.'
        }).code(401);
      }

      var newQuote = {
        author: request.payload.author,
        text:  request.payload.text
      };

      if (!quotes.some(function(quote) {
        return quote.author === newQuote.author && quote.text === newQuote.text;
      })) {
        quotes.push(newQuote);
        return reply({quotes: quotes});
      }

      reply('Quote is already in the database').code(403);
    },
    config: {
      validate: {
        payload: {
          author: Joi.string().required(),
          text: Joi.string().required()
        }
      }
    }
  });

  // Update a quote
  server.route({
    method: 'PUT',
    path: '/api/quotes/{id}',
    handler: function(request, reply) {

      if (!request.auth.isAuthenticated) {
        return reply({
          message: 'Not logged in'
        }).code(401);
      }

      var newQuote = {
        author: request.payload.author,
        text: request.payload.text
      };

      // TODO add auth
      quotes[+request.params.id] = newQuote;

      reply({quote: newQuote});
    },
    config: {
      validate: {
        payload: {
          author: Joi.string().required(),
          text: Joi.string().required()
        }
      }
    }
  });

  // Delete a quote
  server.route({
    method: 'DELETE',
    path: '/api/quotes/{id}',
    handler: function(request, reply) {

      if (!request.auth.isAuthenticated) {
        return reply({
          message: 'Not logged in'
        }).code(401);
      }

      quotes.splice(+request.params.id, 1);
      reply('success');
    }
  });
};
