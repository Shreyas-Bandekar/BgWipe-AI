import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
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
    formData.append("image_file", imageFile); // This is the correct field name for ClipDrop API

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
        freeUsed: true
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
      });
    }
  } catch (error) {
    console.log("Error in removeBgImage:", error);
    
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

export { removeBgImage };