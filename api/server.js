const express = require('express');

const serverMiddleware = require('./serverMiddleware');

const registerRouter = require('./register/registerRouter');
const loginRouter = require('./login/loginRouter');
const homeRouter = require('./home/homeRouter');

const server = express();

serverMiddleware(server);

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/home', homeRouter);

module.exports = server;