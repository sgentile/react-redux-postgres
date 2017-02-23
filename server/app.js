const
    Hapi      = require('hapi'),
    Path      = require('path'),
    bookshelf = require('./bookshelf').bookshelf;


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
    host: '0.0.0.0',
    //host: 'localhost',
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

        bookshelf.knex.migrate.latest().then(() => {
           console.log('migrations runs');
        })
            .then(() => bookshelf.knex('users').count('id'))
            .then((c) => parseInt(c[0].count, 10) ? null: bookshelf.knex.seed.run().then(() => console.info('seed run')))
            .then(() => {
                console.info('Running node ' + process.version);
                console.info('Server running at:', server.info.uri, ', Environment:', process.env.NODE_ENV || 'local');
            })

    });


});

module.exports = server;
