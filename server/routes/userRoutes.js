import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { updateUser, deleteUser } from "../controllers/userController.js";
import {
  loginUser,
  registerUser,
  checkUsernameExists,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);
router.get("/check-username/:username", authenticate, checkUsernameExists);

export default router;
