const router = require('express').Router();

const homeMiddleware = require('./homeMiddleware');

router.get('/', homeMiddleware.restricted, (req, res) => {
    try {
        res.status(200).json({ decodedToken: req.decodedJwt });
    } catch (err) {
        res.status(500).json({ error: 'Accessing page.' });
    }
});

module.exports = router;