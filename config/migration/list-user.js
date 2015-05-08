'use strict';

var Db = require('mongodb').Db;

var Server = require('mongodb').Server;

var mongoClient = require('mongodb').MongoClient;

var db = new Db('quotes-api', new Server('localhost', 27017));

var bcrypt = require('bcrypt');

db.open(function open(err, db) {

  var user = {
    firstName: 'Stevenson',
    lastName: 'Michel',
    email: 'thoven@example.com',
    password: 'password1', // use bcrypt
    createdAt: new Date(),
  };

  db.dropDatabase();

  db.createCollection('users', function(err, collection) {

    if (err) {
      return err;
    }

    // Generate a hashed password
    var hashSync = user.password = bcrypt.hashSync(user.password, 10);

    collection.insert(user, {w: 1}, function(err, result) {

      if (err) {
        return err;
      }

      db.close();

    });

  });
})
