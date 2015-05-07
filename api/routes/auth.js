'use strict';

var Joi = require('joi');

var User = require('mongoose').model('User');

var parseUserData = require('../components/parse-user-data');

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

  // Github
  server.route({
    method: ['GET', 'POST'],
    path: '/api/auth/github',
    handler: function(request, reply) {

      var data = parseUserData(request.auth.credentials.profile);
      // Parse the data
      data.createdAt = data.updatedAt = new Date();
      data.token = request.auth.credentials.token;
      data.avatarUrl = request.auth.credentials.profile.raw.avatar_url;

      User.findOne({email: data.email}, function findOne(err, doc) {

        if (err) {
          throw(err);
        }

        if (!doc) {
          // Create the user TODO user async
          User.create(data, function create(err, doc) {

            if (err) {
              throw(err);
            }

            reply({
              user: doc
            });

          });

          return null;
        }

        reply({
          user: doc // TODO parse the user
        });

      });

    },
    config: {
      auth: 'github'
    }
  });

  // Log out
  server.route({
    method: 'DELETE',
    path: '/api/auth',
    handler: function(request, reply) {

    }
  });
};
