// Update with your config settings.
var path = require('path');

module.exports = {

  development: {
    client: 'postgres',
      connection: {
          database: 'dbTodos',
          port: '32768',
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
          tableName: 'knex_migrations'
      }
  }

};
