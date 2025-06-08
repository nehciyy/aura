import express from "express";
import { updateUser, deleteUser } from "../controllers/userController.js";
import {
  loginUser,
  registerUser,
  checkUsernameExists,
} from "../controllers/authController.js";

const router = express.Router();

router.put("/:id", registerUser);
router.delete("/:id", loginUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/check-username/:username", checkUsernameExists);

export default router;
