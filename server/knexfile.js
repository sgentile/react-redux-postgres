// Update with your config settings.
var path = require('path');

module.exports = {

  development: {
    client: 'postgres',
      connection: {
          host: 'localhost',
          database: 'dbTodos',
          port: 32768,
          user:  'postgres',
          password: ''
      },
      seeds: {
        directory: './fixtures'
      },
      pool: {
          min: 0,
          max: 1
      },
      migrations: {
          directory: './server/migrations',
          tableName: 'knex_migrations'
      }
  },
    production: {
        client: 'postgres',
        connection: {
            host: 'db',
            database: 'dbTodos',
            port: 5432,
            user:  'postgres',
            password: ''
        },
        pool: {
            min: 0,
            max: 1
        },
        migrations: {
            directory: './server/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './server/fixtures'
        }
    }

};
