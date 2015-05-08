'use strict';

var Joi = require('joi');

var findOrCreate = require('../components/find-or-create-user');

var bcrypt = require('bcrypt');

module.exports = function(server) {

  server.route({
    method: 'POST',
    path: '/api/users/new',
    handler: function(request, reply) {

      var data = {
        email: request.payload.email,
        password: request.payload.password,
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        createdAt: new Date()
      };

      data.password = bcrypt.hashSync(data.password, 10);

      findOrCreate({email: request.payload.email}, data, function(err, doc) {
        if (err) {
          throw(err);
        }

        var user = doc;

        delete user.password;

        request.auth.session.set(user);

        reply({
          user: user
        });

      });
      
    },
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required().label('User Email'),
          password: Joi.string().min(8).required(),
          password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } }).label('This label is not used because language.label takes precedence'),
          firstName: Joi.string().min(2).required(),
          lastName: Joi.string().min(2).required(),
        }
      },
      auth: {
        mode: 'try'
      }
    }
  });

};
