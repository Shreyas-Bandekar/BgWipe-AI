import express from 'express';
import { clerkWebhooks } from '../controllers/user.controller.js';
import authuser from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credits', authuser, usercredits);

export default userRouter;
