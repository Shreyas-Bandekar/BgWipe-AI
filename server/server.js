
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
app.get("/", (req, res) => {
  console.log('Root route accessed - sending immediate response');
  return res.json({ 
    success: true, 
    message: "API is working", 
    timestamp: new Date().toISOString(),
    dbStatus: dbConnected ? "connected" : "not connected"
  });
});

// DB connection route
app.get("/db-test", async (req, res) => {
  try {
    console.log('DB test route accessed');
    await ensureDBConnected();
    console.log('DB connection ensured, sending response');
    return res.json({ success: true, message: "Database connected", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error in DB test route:', error);
    return res.status(500).json({ success: false, message: "Database connection failed", error: error.message });
  }
});

// Simple health check without DB
app.get("/health", (req, res) => {
  console.log('Health check accessed');
  return res.json({ success: true, message: "Server is running", timestamp: new Date().toISOString() });
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
