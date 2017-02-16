'use strict';

var config = require('./config.json');
var knex = require('knex')(config.knex);

exports.bookshelf = require('bookshelf')(knex);
