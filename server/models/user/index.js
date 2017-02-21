'use strict';

const
    User = require('./model').User,
    Boom = require('boom'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    config = require('../../config.json'),
    Joi = require('joi');

const reject = (reply) => {
    return function (err) {
        console.log('user', err.stack);
        reply(Boom.wrap(err));
    };
};

const signToken = (user, agent) => {
    const opt = {
        expiresIn: config.tokenExpiration * 60,
        issuer: config.tokenIssuer
    };

    return jwt.sign({user, agent}, config.privateKey, opt);  // secret is defined in the environment variable JWT_SECRET
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET', path: '/api/restricted', config: {auth: 'jwt'},
            handler: (request, reply) => {
                reply({text: 'You used a Token!'})
                    .header("Authorization", request.headers.authorization);
            }
        },
        {
            method: 'GET',
            path: '/api/users',
            config: {auth: 'jwt'},
            handler: (request, reply) => {
                //new UserService(request).getUsers().then(reply, reject(reply));
                new User().fetchAll({withRelated:['todos']}).then(reply, reject(reply));
            }
        },
        {
            method: 'POST',
            path: '/api/users',
            config: {
                auth: 'jwt',
                tags: ['api'],
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required(),
                        name: Joi.string().required(),
                        email: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                const salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync(request.payload.password, salt);

                return new User({
                    username: request.payload.username,
                    password,
                    name: request.payload.name,
                    email: request.payload.email
                }).save().then(reply, reject(reply));
            }
        },
        {
            method: 'POST',
            path: '/api/auth',
            config: {
                auth: false,
                tags: ['api'],
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {
                if (request.headers.authorization) {
                    reply(Boom.conflict('Already authenticated'));
                } else {

                    let user;

                    return new User({username: request.payload.username}).fetch().then((u) => {
                        user = u;
                        if (user) {
                            return bcrypt.compare(request.payload.password, user.get('password'));
                        } else {
                            reply(Boom.unauthorized("Not authorized - please check your username and/or password"));
                        }

                    }).then((res) => {
                        user = user.omit('password'); //don't include in token - converts to json object

                        const token = signToken(user, request.headers['user-agent']);
                        reply(token);
                    });
                }

            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name: 'User'
};
