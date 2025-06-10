import express from "express";
import multer from "multer";
import { getUserAudio, uploadAudio } from "../controllers/audioController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadCloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

// Using Cloudinary for file uploads instead (enable this for local development)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // ensure uploads/ folder exists
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

router.get("/user/:userID", authMiddleware, getUserAudio);
router.post(
  "/upload",
  authMiddleware,
  uploadCloudinary.single("audioFile"),
  uploadAudio
); // Use Cloudinary for file uploads

export default router;
