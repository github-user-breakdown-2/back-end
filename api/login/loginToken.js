const jwt = require('jsonwebtoken'); 

const secrets = process.env.JWT_SECRET || process.env.JWT_SECRET_DEV;

function loginToken(user) {
    const payload = {
        subject: user.id, 
        email: user.email,
    }

    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, secrets, options);
}

module.exports = loginToken;