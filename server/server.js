
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
    await connectDB();
    dbConnected = true;
  }
}

// Middleware
app.use(express.json());
app.use(cors());

// Ensure DB connection before each request
app.use(async (req, res, next) => {
  await ensureDBConnected();
  next();
});

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", useRouter);
app.use("/api/image", imageRouter);

// ✅ Local dev only (will NOT run on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export for Vercel
export default serverless(app);
