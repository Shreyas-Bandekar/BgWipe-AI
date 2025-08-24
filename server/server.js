import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import useRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imagesRoutes.js";

const app = express();

// DB connection
let dbConnected = false;
async function ensureDBConnected() {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log("✅ MongoDB connected successfully");
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
      throw error;
    }
  }
}
ensureDBConnected().catch(console.error);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  try {
    await ensureDBConnected();
    res.json({
      success: true,
      message: "API is working",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});
app.get("/api/ping", (req, res) => {
  res.json({
    success: true,
    message: "🎉 Backend is live and connected on Railway!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/user", useRouter);
app.use("/api/image", imageRouter);

// ✅ Railway: listen on the assigned port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
