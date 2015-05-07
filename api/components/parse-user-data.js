'use strict';

module.exports = function parse(data) {

  var parsedData = {};

  var displayName = function displayName(d) {

    if (d.displayName) {
      return d.displayName;
    }

    return d.firstName + ' ' + d.lastName;
  };

  var firstName = function firstName(d) {

    if (d.firstName) {
      return d.firstName;
    }

    return (d.displayName || '').split(/\s/)[0];
  };

  var lastName = function lastName(d) {

    if (d.lastName) {
      return d.lastName;
    }

    return (d.displayName || '').split(/\s/)[1];
  };

  parsedData.displayName = (data.displayName || displayName(data));

  parsedData.firstName = (data.firstName || firstName(data));

  parsedData.lastName = (data.lastName || lastName(data));

  parsedData.email = data.email;

  return parsedData;
};
