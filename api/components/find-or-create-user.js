'use strict';

var User = require('mongoose').model('User');

/**
 * Find a user if exists return it else create one and then return
 * @param {Object}   option the criteria to match a user
 * @param {Object}   data   the data to be saved if not found
 * @param {Function} next   The callback
 */
 module.exports = function findOrCreate(option, data, next) {

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
