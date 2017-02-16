'use strict';

const bookshelf = require('../../bookshelf').bookshelf;
const User = require('../user/model').User;

exports.Todo = bookshelf.Model.extend({
    tableName: 'todos',
    user: () => {
        return this.belongsTo(User)
    }
});
