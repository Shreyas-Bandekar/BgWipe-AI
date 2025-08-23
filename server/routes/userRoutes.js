import express from "express";
import {
  clerkWebhooks,
  userCredits,
} from "../controllers/UserController.js";
import authUser from "../middlewares/auth.js";

const useRouter = express.Router();

useRouter.post("/webhooks", clerkWebhooks);
useRouter.get("/credits", authUser, userCredits);

// Test endpoint to debug authentication
useRouter.get("/test-auth", authUser, (req, res) => {
  const clerkId = req.user?.clerkId || req.body?.clerkId;
  res.json({ 
    success: true, 
    message: "Authentication working", 
    clerkId,
    method: req.method,
    hasReqUser: !!req.user,
    hasReqBody: !!req.body
  });
});

// Health check endpoint
useRouter.get("/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "User service is healthy",
    timestamp: new Date().toISOString()
  });
});

export default useRouter;