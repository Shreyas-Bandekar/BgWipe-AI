import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import imageHistoryModel from "../models/imageHistoryModel.js";

const removeBgImage = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { clerkId } = req.body;

    let user = await userModel.findOne({ clerkId });
    
    // If user doesn't exist, create them with default values
    if (!user) {
      console.log("User not found in database during image processing, creating new user with clerkId:", clerkId);
      
      try {
        user = await userModel.create({
          clerkId: clerkId,
          email: `user_${clerkId}@temp.com`, // Temporary email, will be updated by webhook
          firstName: "User",
          lastName: "",
          photo: "",
          creditBalance: 5, // Default credits
          hasUsedFreeRemoval: false
        });
        
        console.log("Created new user during image processing:", user);
      } catch (createError) {
        console.log("Error creating user during image processing:", createError);
        return res.json({ success: false, message: "Failed to create user account" });
      }
    }
    
    // Check if this is a free removal (first time use)
    const isFreeRemoval = !user.hasUsedFreeRemoval;
    
    // If not a free removal, check credit balance
    if (!isFreeRemoval && user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    
    console.log("File received:", req.file);
    
    const imagePath = req.file.path;
    console.log("Image path:", imagePath);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(400).json({ success: false, message: "File not found on server" });
    }
    
    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);

    console.log("Using ClipDrop API key:", process.env.CLIPDROP_API ? "Key exists" : "Key missing");
    
    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    
    console.log("ClipDrop API request successful");

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;
    
    const processingTime = Date.now() - startTime;

    // Save to history
    await imageHistoryModel.create({
      userId: user._id,
      clerkId: user.clerkId,
      originalImageName: req.file.originalname,
      imageSize: req.file.size,
      processingTime,
      wasFreeRemoval: isFreeRemoval,
      status: 'success'
    });

    // Update user based on whether this is a free removal or not
    if (isFreeRemoval) {
      await userModel.findByIdAndUpdate(user._id, {
        hasUsedFreeRemoval: true
      });
      
      res.json({
        success: true,
        resultImage,
        creditBalance: user.creditBalance,
        message: "Background Removed (Free)",
        freeUsed: true,
        processingTime
      });
    } else {
      await userModel.findByIdAndUpdate(user._id, {
        creditBalance: user.creditBalance - 1,
      });

      res.json({
        success: true,
        resultImage,
        creditBalance: user.creditBalance - 1,
        message: "Background Removed",
        processingTime
      });
    }

    // Clean up uploaded file
    fs.unlink(imagePath, (err) => {
      if (err) console.log("Error deleting temp file:", err);
    });

  } catch (error) {
    console.log("Error in removeBgImage:", error);
    
    // Save failed attempt to history if user exists
    try {
      const user = await userModel.findOne({ clerkId: req.body.clerkId });
      if (user && req.file) {
        await imageHistoryModel.create({
          userId: user._id,
          clerkId: user.clerkId,
          originalImageName: req.file.originalname,
          imageSize: req.file.size,
          processingTime: Date.now() - startTime,
          wasFreeRemoval: !user.hasUsedFreeRemoval,
          status: 'failed'
        });
      }
    } catch (historyError) {
      console.log("Error saving failed attempt to history:", historyError);
    }
    
    if (error.response) {
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);
    }
    
    // Check if it's a ClipDrop API error
    if (error.message && error.message.includes('clipdrop-api')) {
      console.log("ClipDrop API error detected");
      return res.json({ success: false, message: "Error with background removal service. Please try again later." });
    }
    
    console.log("Error message:", error.message);
    res.json({ success: false, message: error.message || "An unknown error occurred" });
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
          creditBalance: 5, // Default credits
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