import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import useRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imagesRoutes.js";

const app = express();

// ✅ Connect DB once
connectDB().catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1);
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🎉 API is live on Railway!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/user", useRouter);
app.use("/api/image", imageRouter);

// ✅ Railway: listen on the assigned port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
