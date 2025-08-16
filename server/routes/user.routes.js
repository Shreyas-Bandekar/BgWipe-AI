import express from "express";
import { clerkWebHooks, userCredits } from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);
userRouter.get("/credits", authUser, userCredits);

export default userRouter;   // ✅ ESM default export
