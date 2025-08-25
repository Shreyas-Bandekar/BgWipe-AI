import multer from "multer";
import path from "path";
import fs from "fs";

let storage;

if (process.env.NODE_ENV === "production") {
  // Memory storage for production (Render/Vercel)
  storage = multer.memoryStorage();
} else {
  // Disk storage for development
  const uploadsDir = path.join(process.cwd(), "uploads");

  // Ensure uploads folder exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
}

const upload = multer({ storage });

export default upload;
