'use strict';

const bcrypt = require('bcryptjs');
//const Promise = require('Bluebird');

exports.seed = function(knex, promise) {
    return promise.join(
        knex('users').del(),
        knex('todos').del(),

        knex('users').insert({
            id: 1,
            username: 'sgentile',
            name: 'Steve',
            email: 'steven.gentile@gmail.com',
            password: bcrypt.hashSync('password', bcrypt.genSaltSync(10))
        }),

        knex('todos').insert({
            id: 1,
            name: 'Take out dishes',
            completed: false,
            user_id: 1
        })
    )
};
