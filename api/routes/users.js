'use strict';

var Joi = require('joi');

module.exports = function(server) {
  server.route({
    method: 'POST',
    path: '/api/users/new',
    handler: function(requet, reply) {

    },
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required().label('User Email'),
          password: Joi.string().min(8).required(),
          password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } }).label('This label is not used because language.label takes precedence'),
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
        }
      }
    }
  });
};
