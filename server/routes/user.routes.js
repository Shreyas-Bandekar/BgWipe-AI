const express = require('express');
const { clerkWebHooks } = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebHooks);

module.exports = userRouter;