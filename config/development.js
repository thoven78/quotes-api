'use strict';

var locals = require('./local');

var local = {
  db: 'mongodb://localhost/quotes-api',
  port: 4000,
  clientID: '',
  clientSecret: '',
  url: 'li.dev' + (this.port ? ':' + this.port : '')
};


for (var l in locals) {
  local[l] = locals[l];
}

module.exports = local;
