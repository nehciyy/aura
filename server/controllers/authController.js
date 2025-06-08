import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.conpare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      firstName,
      lastName,
      password: hashed,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkUsernameExists = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    res.status(404).json({ exists: err.message });
  }
};
