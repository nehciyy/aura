import Audio from "../models/Audio.js";

export const getUserAudio = async (req, res) => {
  try {
    const userID = req.params.userID;
    if (req.user.id !== userID) {
      return res.status(403).json({ message: "Forbidden" });
    }
    console.log("Received userID:", userID);

    const audios = await Audio.find({ userID });
    console.log("Fetched audios:", audios);
    res.status(200).json(audios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadAudio = async (req, res) => {
  try {
    const { description, category } = req.body;
    const userID = req.user.id;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded." });

    const audioUrl = req.file.path || req.file.secure_url;

    const newAudio = new Audio({
      userID,
      filename: file.originalname,
      description,
      src: audioUrl, // Use the path or secure_url from Cloudinary
      category,
    });

    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};
