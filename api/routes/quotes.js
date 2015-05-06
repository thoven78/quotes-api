'use strict';

var Joi = require('joi');

var Quote = require('mongoose').model('Quote');

module.exports = function quotes(server) {

  server.route({
    method: 'GET',
    path: '/api/quotes',
    handler: function(request, reply) {

      Quote.find(function all(err, docs) {
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

      Quote.random(function random(err, doc) {

        if (err) {
          return reply('empty');
        }

        reply({
          quote: doc
        });
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/quotes/{id}',
    handler: function(request, reply) {

      Quote.findOne({_id: request.params.id}, function findOne(err, doc) {
        if (err) {
          return reply('Not found').code(404);
        }
        reply({
          quote: doc
        })
      });

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
        text:  request.payload.text,
        createdAt: new Date()
      };
      // TODO grab the current user and assing it as the _creator
      Quote.findOrCreate(newQuote, function findOrCreate(err, doc) {
        if (err) {
          return reply('Error').code(500);
        }
        reply({
          quote: doc
        });
      });
    },
    config: {
      validate: {
        payload: {
          author: Joi.string().min(2).required(),
          text: Joi.string().min(2).required()
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
        text: request.payload.text,
        updatedAt: new Date()
      };

      Quote.findByIdAndUpdate(req.params.id, {$set: newQuote}, function findByIdAndUpdate(err, doc) {

        if (err) {
          return reply('Oops quote with id ' + req.params.id + ' does not exist');
        }

        reply({
          quote: doc
        });

      });

    },
    config: {
      validate: {
        payload: {
          author: Joi.string().min(2).required(),
          text: Joi.string().min(2).required()
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

      Quote.remove({_id: req.params.id}, function
        remove(err, doc) {
        if (err) {
          return reply({
            message: 'Oops! quote was not found'
          }).code(404);
        }
        reply('success');
      });

    }
  });
};
