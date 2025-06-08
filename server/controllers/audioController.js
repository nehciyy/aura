import Audio from "../models/Audio.js";

export const getUserAudio = async (req, res) => {
  try {
    const audios = await Audio.find({ userId: req.params.userId });
    res.status(200).json(audios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAudioById = async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.audioId);
    res.status(200).json(audio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadAudio = async (req, res) => {
  try {
    const { description, category } = req.body;
    const userId = req.user.id;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded." });

    const newAudio = new Audio({
      userId,
      filename: file.originalname,
      src: `/uploads/${file.filename}`, // Adjust path as needed
      description,
      category,
      uploadedAt: new Date(),
    });

    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};
