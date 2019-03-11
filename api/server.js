const express = require('express');

const serverMiddleware = require('./serverMiddleware');
const registerRouter = require('./register/registerRouter');

const server = express();

serverMiddleware(server);

server.use('/api/register', registerRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "Server working" });
});

module.exports = server;