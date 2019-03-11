const jwt = require('jsonwebtoken'); 
const secrets = process.env.JWT_SECRET;

module.exports = {
        
    checkUser: function(req, res, next) {
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(404).json({error: 'Email and password required.'});
            return;
        } else {
            next();
        }
    },

}