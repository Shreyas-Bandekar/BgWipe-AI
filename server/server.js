import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import useRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imagesRoutes.js";
import serverless from "serverless-http";

// App Config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

// Initialized Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", useRouter);
app.use("/api/image", imageRouter);

app.listen(PORT, () => console.log("Server running on port: ", PORT));

export const handler = serverless(app);
export default handler;