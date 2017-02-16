'use strict';

const bookshelf = require('../../bookshelf').bookshelf;
const Todo = require('../todos/model').Todo;

exports.User = bookshelf.Model.extend({
    tableName: 'users',
    todos: function() {
        return this.hasMany(Todo);
    }
});
