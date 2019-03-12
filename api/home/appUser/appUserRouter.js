const router = require('express').Router();

const homeMiddleware = require('../homeMiddleware');
const appUsersMiddleware = require('./appUserMiddleware');
const appUsers = require('./appUserModel');

router.get('/:id', homeMiddleware.restricted, async (req, res) => {
    const id = req.params.id
    try {
        const user = await appUsers.getUserByID(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: 'Error getting app users.'});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const count = await appUsers.delete(id);
        res.status(200).json({ message: 'Number of user deleted', count });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', appUsersMiddleware.projectCheck, async (req, res, next) => {
    const id = req.params.id;
    try {
        await appUsers.update(id, {...req.body});
        const updatedUser = await appUsers.getUserByID(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        next({code: 500, action: 'updating', subject: 'project'});
    }
});

module.exports = router;