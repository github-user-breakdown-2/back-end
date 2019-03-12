const db = require('../../data/dbConfig');

module.exports = {
    add: async function(user) {
        const [id] = await db('appUsers').insert(user);
        return db('appUsers').where({ id }).first();
    },
    getUserByEmail: function(email) {
        return db('appUsers').where({ email });
    }
};