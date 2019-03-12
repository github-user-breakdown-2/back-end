const router = require('express').Router();
const bcrypt = require('bcryptjs');

const routerMiddleware = require('./registerMiddleware');
const appUsers = require('./registerModel');

router.post('/', routerMiddleware.checkUser, async (req, res) => {
    let { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    password = hash;
    try {
        const registeredUser = await appUsers.add({ email, password });
        res.status(201).json(registeredUser);
    } catch (err) {
        res.status(500).json({ error: 'Error registering the user.' });
    }

});

module.exports = router;
