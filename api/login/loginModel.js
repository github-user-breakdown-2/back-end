const db = require('../../data/dbConfig');

module.exports = {
    getUserByEmail: function(email) {
        return db('appUsers').where({ email }).first();
    }
};