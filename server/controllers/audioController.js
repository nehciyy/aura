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
  const { userId, filename, description, src, category, uploadedAt } = req.body;
  try {
    const newAudio = new Audio({
      userId,
      filename,
      description,
      src,
      category,
      uploadedAt,
    });
    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
