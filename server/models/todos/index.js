'use strict';

const
    Boom = require('boom'),
    User = require('../user/model').User,
    Todo = require('./model').Todo;

const reject = (reply) => {
    return function (err) {
        console.log('user', err.stack);
        reply(Boom.wrap(err));
    };
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/api/todos/user',
            config: {auth: 'jwt'},
            handler: (request, reply) => {
                new Todo({user_id:request.auth.credentials.user.id}).fetchAll().then(reply, reject(reply));
            }
        },
        {
            method: 'GET',
            path: '/api/todos/{id}',
            config: {auth: 'jwt'},
            handler: (request, reply) => {
                new Todo({id:request.params.id}).fetch().then(reply, reject(reply));
            }
        },
        {
            method: 'POST',
            path: '/api/todos',
            handler: (request, reply) => {
                const user_id = request.auth.credentials.user.id;
                new Todo({
                    name: request.payload.name,
                    completed: false,
                    date: new Date(),
                    user_id
                }).save().then(reply, reject(reply));
            }
        },
        {
            method: 'PUT',
            path: '/api/todos',
            handler: (request, reply) => {
                const user_id = request.auth.credentials.user.id;
                new Todo({
                    id: request.payload.id,
                    name: request.payload.name,
                    completed: request.payload.completed,
                    date: new Date(),
                    user_id
                }).save().then(reply, reject(reply));
            }
        },
        {
            method: 'DELETE',
            path: '/api/todos/{id}',
            handler: (request, reply) => {
                new Todo({id:request.params.id}).destroy().then(reply, reject(reply));
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name: 'Todo'
};

