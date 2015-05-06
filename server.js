'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotes');

// Require the user model
require('./api/models/user');
require('./api/models/quote');

require('./api/routes/quotes'); // The main API
