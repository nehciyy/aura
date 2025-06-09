import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: { type: String, required: true },
    description: { type: String, default: "" },
    src: { type: String, required: true },
    category: { type: String, default: "Others" },
  },
  { timestamps: true }
);

export default mongoose.model("Audio", audioSchema);
