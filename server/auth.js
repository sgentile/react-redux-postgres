const
    jwt = require('jsonwebtoken'),
    config    = require('./config.json');

exports.register = function (server, options, next) {

    server.auth.strategy('jwt', 'jwt', {
        key: config.privateKey,          // Never Share your secret key
        validateFunc: (decodedToken, request, callback) => {
            return callback(null, !!decodedToken.user, decodedToken.user ? decodedToken : false);
        },
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    });

    server.auth.default('jwt');

    next();
};

exports.register.attributes = {
    name: 'Auth'
};
