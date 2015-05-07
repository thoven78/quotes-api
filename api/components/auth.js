'use strict';

var Bell = require('bell');
var AuthCookie = require('hapi-auth-cookie');

module.exports = function isAuthenticated(server, config) {
  // OAuth
  server.register([Bell, AuthCookie], function bell(err) {

    if (err) {
      console.error(err);
      return process.exit(1);
    }

    // Declare Auth strategy using the bell scheme
    // with the name of the provider, cookie encryption password
    // and the OAuth client credentials
    server.auth.strategy('github', 'bell', {
      provider: 'github',
      password: 'github-encryption-password', //Password used for encryption
      clientId: config.clientID,
      clientSecret: config.clientSecret,
      isSecure: false, // Terrible but for now we are using http, please change to true in production
      providerParams: {
        redirect_uri: config.url + '/api/auth/github'
      }
    });

    // Declare Auth cookie strategy
    server.auth.strategy('session', 'cookie', {
      password: 'cookie-encryption-password', //Password used for encryption
      cookie: 'sid-quote', // Name of cookie to set
      isSecure: false
    });

    server.auth.default('session');

  });

};
