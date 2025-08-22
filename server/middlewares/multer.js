import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Creating multer middleware to parsing formdata
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadsDir);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;