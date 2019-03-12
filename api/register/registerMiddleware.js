const appUsers = require('./registerModel');

module.exports = {
        
    checkUser: async function(req, res, next) {
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({error: 'Email and password required.'});
            return;
        } else {
            // try {
            //     const users = await appUsers.getUserByEmail(email);
            //     if (users.length === 0) {
                    next();
            //     } else {
            //         res.status(404).json({error: 'User already registered with specified email.'});
            //         return;
            //     }
            // } catch (err) {
            //     res.status(404).json({error: 'Error fetching users.'});
            // }
        }
    },

}