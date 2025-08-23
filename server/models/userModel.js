import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, default: "" }, // Make photo optional with default empty string
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    creditBalance: { type: Number, default: 5 }, // Default 5 credits for each user
    hasUsedFreeRemoval: { type: Boolean, default: false },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;