'use strict';

var Db = require('mongodb').Db;

var Server = require('mongodb').Server;

var mongoClient = require('mongodb').MongoClient;

var db = new Db('quotes-api', new Server('localhost', 27017));

db.open(function open(err, db) {

  var user = {
    firstName: 'Stevenson',
    lastName: 'Michel',
    email: 'thoven@example.com',
    //password: , // use bcrypt
    createdAt: new Date(),
  };

  db.dropDatabase();

  // TODO generate the hash and store the hash and then sync

  db.createCollection('users', function(err, collection) {

    if (err) {
      return err;
    }

    collection.insert(user, {w: 1}, function(err, result) {

      if (err) {
        return err;
      }

      console.log(result, 'finished creating user');
      db.close();

    });
  });
})
