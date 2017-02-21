const
    Hapi      = require('hapi'),
    Path      = require('path');


const server = new Hapi.Server({
    debug: {request: ['error']},
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({
    //host: '0.0.0.0',
    host: 'localhost',
    port: 8000
});
server.register([require('hapi-auth-jwt2'), require('./auth'), require('inert'),  require('./models/user'), require('./models/todos')], (err) => {
    if(err){
        throw err;
    }

    server.route([
        {
            method: 'GET',
            path: '/{param*}',
            config: { auth: false },
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true
                }
            }
        }
    ]);




    server.start((err) => {
        if(err){
            throw err;
        }

        console.log('server running at: ' + server.info.uri);
    });

});

module.exports = server;
