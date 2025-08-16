const express = require('express');
const { clerkWebHooks, userCredits } = require('../controllers/user.controller.js');
const { default: authUser } = require('../middlewares/auth.middleware.js');

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebHooks);
userRouter.get('/credits', authUser, userCredits);

module.exports = userRouter;