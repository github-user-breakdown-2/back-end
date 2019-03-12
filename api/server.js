const express = require('express');

const serverMiddleware = require('./serverMiddleware');

const registerRouter = require('./register/registerRouter');
const loginRouter = require('./login/loginRouter');
const homeRouter = require('./home/homeRouter');
const githubUsersRouter = require('./githubUsers/githubUsersRouter');

const server = express();

serverMiddleware(server);

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/app/', homeRouter);
server.use('/api/app/githubusers', githubUsersRouter);

module.exports = server;