'use strict';

var Joi = require('joi');

module.exports = function(server) {
  // Cookie auth
  server.route({
    method: 'POST',
    path: '/api/auth',
    handler: function(request, reply) {
      // TODO require bcrypt
    },
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required().label('User Email'),
          password: Joi.string().min(8).required()
        }
      }
    }
  });

  // OAuth
  // TODO handle OAuth
  server.route({
    method: 'POST',
    path: '/api/oauth',
    handler: function(request, reply) {

    }
  })

  // Log out
  server.route({
    method: 'DELETE',
    path: '/api/auth',
    handler: function(request, reply) {

    }
  });
};
