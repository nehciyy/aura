import express from "express";
import {
  getUserAudio,
  uploadAudio,
  getAudioById,
} from "../controllers/audioController.js";

const router = express.Router();

router.get("/user/userId", getUserAudio);
router.get("/:audioId", getAudioById);
router.post("/upload", uploadAudio);

export default router;
