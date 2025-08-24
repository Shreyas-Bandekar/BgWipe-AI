
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import useRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imagesRoutes.js";
import serverless from "serverless-http";

const app = express();

let dbConnected = false;
async function ensureDBConnected() {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
}

// Initialize DB connection (but don't block)
ensureDBConnected().catch(console.error);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  try {
    await ensureDBConnected();
    res.send("API is working");
  } catch (error) {
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});
app.use("/api/user", useRouter);
app.use("/api/image", imageRouter);

// ✅ Local dev only (will NOT run on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export for Vercel
export default serverless(app);
