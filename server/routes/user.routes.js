import express from 'express'
import { clerkWebHooks } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebHooks)


export default userRouter