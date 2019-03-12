const db = require('../../../data/dbConfig');

module.exports = {
    getUserByID: function(id) {
        return db('appUsers').select('id', 'email').where({ id }).first();
    },

    delete: function(id) {
        return db('appUsers').where({ id }).del();
    },

    update: function(id, changes) {
        return db('appUsers')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getUserByID(id) : null));
    }
};