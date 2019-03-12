const router = require('express').Router();
const bcrypt = require('bcryptjs');

const routerMiddleware = require('./registerMiddleware');
const appUsers = require('./registerModel');

router.post('/', routerMiddleware.checkUser, async (req, res) => {
    // let { email, password } = req.body;
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    try {
        // console.log(appUsers.add);
        const registeredUser = await appUsers.add(user);
        res.status(201).json(registeredUser);
        // res.status(201).json({ email, password });

    } catch (err) {
        res.status(500).json({ error: 'Error registering the user.' });
    }

});

module.exports = router;
