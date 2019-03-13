const router = require('express').Router();
const axios = require('axios');

const homeMiddleware = require('../homeMiddleware');

router.get('/', homeMiddleware.restricted, async (req, res) => {
    let { username } = req.body
    try {
        const users = await axios.get(`https://api.github.com/search/users?q=${username}`);
        const usersCompressed = users.data.items.map(user => user = { login: user.login, html_url: user.html_url } );
        res.status(200).json(usersCompressed);
    } catch (err) {
        res.status(500).json({ error: 'Accessing page.' });
    }
});

module.exports = router;