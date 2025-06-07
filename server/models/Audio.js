import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  description: String,
  catergory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  uploadedAt: { type: Date, default: Date.now },
  audioURL: String,
});

export default mongoose.model("Audio", audioSchema);
