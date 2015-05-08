'use strict';

var Joi = require('joi');

var User = require('mongoose').model('User');

var bcrypt = require('bcrypt');

var parseUserData = require('../components/parse-user-data');

var findOrCreate = require('../components/find-or-create-user');

module.exports = function(server) {
  // Cookie auth
  server.route({
    method: 'POST',
    path: '/api/auth',
    handler: function(request, reply) {

      var user = {
        email: (request.payload.email || '').trim()
      };

      User.findOne(user, function findOne(err, doc) {

        if (err) {
          reply({
            message: 'No such user'
          }).code(403);
        }

        var password = (request.payload.password || '').trim();

        var hashPass = bcrypt.hashSync(password, 10);

        bcrypt.compare(hashPass, password, function(err) {

          if (err) {
            return reply({
              message: 'Wrong credentials combination'
            }).code(404);
          }

          var user = doc;

          delete user.password;

          request.auth.session.set(doc);

          reply({
            user: user
          });

        });

      });
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
