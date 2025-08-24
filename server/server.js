
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
  console.log('Root route hit');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: "API is working", 
    timestamp: new Date().toISOString(),
    dbStatus: dbConnected ? "connected" : "not connected"
  }));
});

app.get("/health", (req, res) => {
  console.log('Health check hit');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    success: true, 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  }));
});

// DB connection route
app.get("/db-test", async (req, res) => {
  try {
    console.log('DB test route accessed');
    await ensureDBConnected();
    console.log('DB connection ensured, sending response');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: "Database connected", timestamp: new Date().toISOString() }));
  } catch (error) {
    console.error('Error in DB test route:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: "Database connection failed", error: error.message }));
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
const handler = serverless(app);
export default handler;
