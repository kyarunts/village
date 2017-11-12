var express = require('express');
var userRouter = express.Router();

var userHandlers = require('./controllers/user');

userRouter.post('/register', userHandlers.register);

userRouter.post('/sign_in', userHandlers.sign_in);

userRouter.get('/users', userHandlers.isAdmin, userHandlers.getByQuery);

module.exports = userRouter;
