const jwt = require('jsonwebtoken'); 
const secrets = process.env.JWT_SECRET;

module.exports = {

    restricted: function(req, res, next) {
        const token = req.headers.authorization;
    
        if(token) {
            jwt.verify(token, secrets, (err, decodedToken) => {
                if(err) {
                    res.status(401).json({error: 'Unauthorized.'});
                } else {
                    req.decodedJwt = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({error: 'Unauthorized.'});
        }
    },

}