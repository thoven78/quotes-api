'use strict';

var Db = require('mongodb').Db;
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var Server = require('mongodb').Server;

var db = new Db('quotes-api', new Server('localhost', 27017));

db.open(function open(err, db) {
  // TODO make _creator dynamic
  var quot = [
    {
      'author': 'Voltaire',
      '_creator': '554a74c6ada7b15124a2541b',
      'text': 'God gave us the gift of life; it is up to us to give ourselves the gift of living well.'
    },
    {
      'author': 'Voltaire',
      '_creator': '554a74c6ada7b15124a2541b',
      'text': 'It is difficult to free fools from the chains they revere.'
    },
    {
      'author': 'Voltaire',
      '_creator': '554a74c6ada7b15124a2541b',
      'text': 'With great power comes great responsability'
    }
  ];

  var docs = [];

  quot.forEach(function each(doc, index) {
    doc.createdAt = new Date(Date.now() + index * 1000);
    docs[index] = doc;
  });

  db.dropDatabase();

  db.createCollection('quotes', function quotes(err, collection) {

    if (err) {
      return err;
    }

    collection.insert(docs, {w: 1}, function(err, result) {

      if (err) {
        return err;
      }

      console.log(result, 'finished');
      db.close();

    });
  });

});
