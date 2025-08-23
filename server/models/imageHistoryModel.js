import mongoose from "mongoose";

const imageHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    clerkId: { type: String, required: true },
    originalImageName: { type: String, required: true },
    processedAt: { type: Date, default: Date.now },
    imageSize: { type: Number }, // in bytes
    processingTime: { type: Number }, // in milliseconds
    wasFreeRemoval: { type: Boolean, default: false },
    status: { type: String, enum: ['success', 'failed'], default: 'success' }
});

const imageHistoryModel = mongoose.models.imageHistory || mongoose.model("imageHistory", imageHistorySchema);

export default imageHistoryModel;