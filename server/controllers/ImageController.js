import axios from "axios";
import userModel from "../models/userModel.js";
import imageHistoryModel from "../models/imageHistoryModel.js";

const removeBgImage = async (req, res) => {
  const startTime = Date.now();

  try {
    const { clerkId } = req.body;

    if (!clerkId) return res.status(400).json({ success: false, message: "User ID missing" });
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    // Fetch or create user
    let user = await userModel.findOne({ clerkId });
    if (!user) {
      user = await userModel.create({
        clerkId,
        email: `user_${clerkId}@temp.com`,
        firstName: "User",
        lastName: "",
        photo: "",
        creditBalance: 3,
        hasUsedFreeRemoval: false,
      });
    }

    const isFreeRemoval = !user.hasUsedFreeRemoval;
    if (!isFreeRemoval && user.creditBalance <= 0) {
      return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance });
    }

    // Log file info
    console.log("File received:", req.file.originalname, "size:", req.file.size);

    // Prepare FormData
    const formData = new FormData();
    formData.append("image_file", req.file.buffer, req.file.originalname);

    console.log("Sending request to ClipDrop API...");

    const { data, headers } = await axios.post(
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

    // Handle JSON error from ClipDrop
    if (headers["content-type"]?.includes("application/json")) {
      const errorJson = JSON.parse(Buffer.from(data, "binary").toString("utf-8"));
      console.log("ClipDrop API returned JSON error:", errorJson);
      return res.status(400).json({ success: false, message: errorJson.error || "ClipDrop API error" });
    }

    // Convert binary to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;
    const processingTime = Date.now() - startTime;

    // Save history
    await imageHistoryModel.create({
      userId: user._id,
      clerkId: user.clerkId,
      originalImageName: req.file.originalname,
      imageSize: req.file.size,
      processingTime,
      wasFreeRemoval: isFreeRemoval,
      status: "success",
    });

    // Update user credits
    let updatedCredit = user.creditBalance;
    if (isFreeRemoval) await userModel.findByIdAndUpdate(user._id, { hasUsedFreeRemoval: true });
    else {
      updatedCredit -= 1;
      await userModel.findByIdAndUpdate(user._id, { creditBalance: updatedCredit });
    }

    console.log("Background removal successful:", req.file.originalname);

    res.json({
      success: true,
      resultImage,
      creditBalance: updatedCredit,
      freeUsed: isFreeRemoval,
      message: isFreeRemoval ? "Background Removed (Free)" : "Background Removed",
      processingTime,
    });

  } catch (error) {
    console.log("Error in removeBgImage:", error);

    // Save failed history
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
          status: "failed",
        });
      }
    } catch (historyError) {
      console.log("Failed history save error:", historyError);
    }

    const msg = error.response?.data?.error || error.message || "Unknown error during background removal";
    res.status(500).json({ success: false, message: msg });
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