'use strict';

module.exports = function isAuthenticated(server, config) {
  // OAuth
  server.register(require('bell'), function bell(err) {

    // Declare Auth strategy using the bell scheme
    // with the name of the provider, cookie encryption password
    // and the OAuth client credentials
    server.auth.strategy('github', 'bell', {
      provider: 'github',
      password: 'cookie_encryption_password',
      clientId: config.clientID,
      clientSecret: config.clientSecret,
      isSecure: false, // Terrible but for now we are using http, please change to true in production
      providerParams: {
        redirect_uri: config.url + '/api/auth/github'
      }
    });

    // TODO add more strategies
  });

};
