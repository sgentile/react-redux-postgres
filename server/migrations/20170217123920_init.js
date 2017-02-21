
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments('id').primary();
            table.string('username');
            table.string('password');
            table.string('email');
            table.string('name');
            table.timestamp('date');
        }),

        knex.schema.createTable('todos', function (table) {
            table.increments('id').primary();
            table.string('name');
            table.boolean('completed');
            table.timestamp('date');
            table.integer('user_id').references('users.id')
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('todos'),
        knex.schema.dropTableIfExists('users')
    ]);
};
