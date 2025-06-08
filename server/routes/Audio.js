import express from "express";
import multer from "multer";
import {
  getUserAudio,
  uploadAudio,
  getAudioById,
} from "../controllers/audioController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure uploads/ folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/user/:userId", getUserAudio);
router.get("/:audioId", getAudioById);
router.post("/upload", authMiddleware, upload.single("audioFile"), uploadAudio);

export default router;
