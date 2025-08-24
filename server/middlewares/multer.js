import multer from "multer";
import path from "path";
import fs from "fs";

let storage;
if (process.env.NODE_ENV === 'production') {
  // Use memory storage for Vercel
  storage = multer.memoryStorage();
} else {
  // Local disk storage for development
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, uploadsDir);
    },
    filename: function (req, file, callback) {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  });
}

const upload = multer({ storage });

export default upload;