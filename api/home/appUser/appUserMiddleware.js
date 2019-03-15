const appUsers = require('./appUserModel');

module.exports = {

    projectCheck: async function (req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({error: 'Email and password required.'});
            return;
        } else {
            try {
                const user = await appUsers.getUserByID(req.params.id);
                if (user) {
                    next();
                }
            } catch (err) {
                res.status(404).json({error: 'User by specified ID does not exist.'});
            }
        }
    }

}