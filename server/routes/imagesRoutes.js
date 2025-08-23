import express from "express";
import { removeBgImage, getUserHistory } from "../controllers/ImageController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post(`/remove-bg`, upload.single("image"), authUser, removeBgImage);
imageRouter.get(`/history`, authUser, getUserHistory);

export default imageRouter;