import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import imageHistoryModel from "../models/imageHistoryModel.js";

const removeBgImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("File received:", req.file.originalname);

    // Send file directly (buffer works fine)
    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      req.file.buffer, // ✅ send raw buffer
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          "Content-Type": "application/octet-stream",
        },
        responseType: "arraybuffer",
      }
    );

    console.log("ClipDrop API request successful");

    // Convert to base64 for frontend
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    res.json({
      success: true,
      resultImage,
      message: "Background removed successfully",
    });
  } catch (error) {
    console.error("Error in removeBgImage:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Background removal failed" });
  }
};

// Get user's image processing history
const getUserHistory = async (req, res) => {
  try {
    // For GET requests, clerkId is in req.user, for POST requests it's in req.body
    const clerkId = req.user?.clerkId || req.body?.clerkId;
    
    if (!clerkId) {
      return res.json({ success: false, message: "User ID not found" });
    }
    
    let user = await userModel.findOne({ clerkId });
    
    // If user doesn't exist, create them with default values
    if (!user) {
      console.log("User not found in database during history request, creating new user with clerkId:", clerkId);
      
      try {
        user = await userModel.create({
          clerkId: clerkId,
          email: `user_${clerkId}@temp.com`, // Temporary email, will be updated by webhook
          firstName: "User",
          lastName: "",
          photo: "",
          creditBalance: 3, // Default credits
          hasUsedFreeRemoval: false
        });
        
        console.log("Created new user during history request:", user);
      } catch (createError) {
        console.log("Error creating user during history request:", createError);
        return res.json({ success: false, message: "Failed to create user account" });
      }
    }

    const history = await imageHistoryModel
      .find({ clerkId })
      .sort({ processedAt: -1 })
      .limit(50); // Limit to last 50 entries

    const stats = {
      totalProcessed: history.length,
      successfulProcessing: history.filter(h => h.status === 'success').length,
      failedProcessing: history.filter(h => h.status === 'failed').length,
      freeRemovalsUsed: history.filter(h => h.wasFreeRemoval).length,
      averageProcessingTime: history.length > 0 
        ? Math.round(history.reduce((sum, h) => sum + h.processingTime, 0) / history.length)
        : 0
    };

    res.json({
      success: true,
      history,
      stats
    });
  } catch (error) {
    console.log("Error in getUserHistory:", error);
    res.json({ success: false, message: error.message });
  }
};

export { removeBgImage, getUserHistory };