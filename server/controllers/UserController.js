import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API Controller Function to Manage Clerk User with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API Controller function to get user available credits data
const userCredits = async (req, res) => {
  try {
    // For GET requests, clerkId is in req.user, for POST requests it's in req.body
    const clerkId = req.user?.clerkId || req.body?.clerkId;
    
    if (!clerkId) {
      return res.json({ success: false, message: "User ID not found" });
    }
    
    let userData = await userModel.findOne({ clerkId });
    
    // If user doesn't exist, create them with default values
    if (!userData) {
      try {
        // Generate a unique email to avoid conflicts
        const timestamp = Date.now();
        const uniqueEmail = `user_${clerkId}_${timestamp}@temp.com`;
        
        userData = await userModel.create({
          clerkId: clerkId,
          email: uniqueEmail,
          firstName: "User",
          lastName: "",
          photo: "", // Now optional with default
          creditBalance: 3, // Default credits
          hasUsedFreeRemoval: false
        });
        
      } catch (createError) {
        // Check if it's a duplicate key error
        if (createError.code === 11000) {
          // Try to find the user again in case it was created by another request
          userData = await userModel.findOne({ clerkId });
          if (!userData) {
            return res.json({ success: false, message: "User creation failed due to duplicate key" });
          }
        } else {
          return res.json({ success: false, message: "Failed to create user account: " + createError.message });
        }
      }
    }
    
    res.json({ success: true, userCredits: userData.creditBalance });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { clerkWebhooks, userCredits };