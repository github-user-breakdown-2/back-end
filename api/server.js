const express = require('express');

const serverMiddleware = require('./serverMiddleware');
const registerRouter = require('./register/registerRouter');
const loginRouter = require('./login/loginRouter');

const server = express();

serverMiddleware(server);

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "Server working" });
});

module.exports = server;