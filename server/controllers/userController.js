import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const updates = { username, firstName, lastName };
    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
