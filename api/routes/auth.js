'use strict';

var Joi = require('joi');

var User = require('mongoose').model('User');

var parseUserData = require('../components/parse-user-data');

/**
 * Find a user if exists return it else create one and then return
 * @param {Object}   option the criteria to match a user
 * @param {Object}   data   the data to be saved if not found
 * @param {Function} next   The callback
 */
var findOrCreate = function findOrCreate(option, data, next) {
  User.findOne(option, function findOne(err, doc) {

    if (err) {
      return next(err);
    }

    if (!doc) {
      // Create the user TODO user async
      User.create(data, function create(err, doc) {

        if (err) {
          return next(err);
        }

        next(null, doc)

      });

    } else {

      next(null, doc);
    }

  });
};

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
      },
      auth: {
        mode: 'try'
      }
    }
  });

  // Github
  server.route({
    method: ['GET', 'POST'],
    path: '/api/auth/github',
    handler: function(request, reply) {

      if (request.auth.isAuthenticated) {

        request.auth.session.set(request.auth.credentials.profile);

        var data = parseUserData(request.auth.credentials.profile);
        // Parse the data
        data.createdAt = data.updatedAt = new Date();
        data.token = request.auth.credentials.token;
        data.avatarUrl = request.auth.credentials.profile.raw.avatar_url;

        findOrCreate({email: data.email}, data, function(err, doc) {
          if (err) {
            throw(err);
          }

          reply({
            user: doc
          });
        });

      }

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
      request.auth.session.clear();
      reply('success');
    },
    config: {
      auth: false
    }
  });
};
