const db = require('../../data/dbConfig');

module.exports = {
    add: async function(appUser) {
        const [id] = await db('appUsers').insert(appUser);
        return db('appUsers').where({ id }).first();
    },
    getUserByEmail: function(email) {
        return db('appUsers').where({ email });
    }
};