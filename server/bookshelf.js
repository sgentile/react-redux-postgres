'use strict';

const knexFile = require('./knexfile.js');
//var config = require('./config.json');
const env = process.env.NODE_ENV || 'development';
console.log(env, knexFile[env]);
const knex = require('knex')(knexFile[env]);

exports.bookshelf = require('bookshelf')(knex);
