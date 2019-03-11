const router = require('express').Router();
const bcrypt = require('bcryptjs');

const loginMiddleware = require('./loginMiddleware');
const appUsers = require('./loginModel');
const loginToken = require('./loginToken');

router.post('/',loginMiddleware.checkUser, async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await appUsers.getUserByEmail(email);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {

                const token = loginToken(user); 
                let { id, email } = user
                res.status(200).json({
                    id,
                    email,
                    token
                });
            } else {
                res.status(401).json({ error: 'Incorrect password.' });
            }
        } else {
            res.status(401).json({ error: 'Specified email not registered.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Logging in the user.' });
    }
});

module.exports = router;