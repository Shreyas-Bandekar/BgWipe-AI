
import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Simple test route
app.get("/", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "API is working", 
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

// ✅ Local dev only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export for Vercel
export default serverless(app);
