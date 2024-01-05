const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const AudioModel = require("../models/audio.model");

const getAllAudiosByUserID = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const audios = await AudioModel.find({
      userID,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      msg: "Get all audios successfully",
      data: audios,
    });
  } catch (error) {
    console.error(`Failed to get all audios of user ${userID}`, error);

    return res.status(500).json({
      msg: `Failed to get all audios of user ${userID}`,
    });
  }
};

const getAudioByID = async (req, res, next) => {
  const audioID = req.params.audioID;

  try {
    const result = await AudioModel.findById(audioID);

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(`Failed to get audio ${audioID}`);

    return res.status(500).json({
      msg: `Failed to get audio ${audioID}`,
    });
  }
};

const uploadAudioByUserID = async (req, res, next) => {
  try {
    const { audioUrl, userID, cover, name } = req.body;

    const newAudio = await AudioModel.create({
      userID,
      audioUrl,
      cover,
      name,
    });

    return res.status(200).json({
      msg: "Upload new audio successfully",
      data: newAudio,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to upload new audio",
      error,
    });
  }
};

const updateAudioByUserID = async (req, res, next) => {
  const audioID = req.params.audioID;
  const userID = req.params.userID;

  try {
    const { newAudio } = req.body;
    const AudioModel = await AudioModel.findById({ audioID, userID });

    AudioModel.cover = newAudio || AudioModel.cover;

    const updatedAudio = await AudioModel.save();

    return res.status(200).json({
      msg: `Updates audio successfully`,
      data: updatedAudio,
    });
  } catch (error) {
    console.error(`Failed to update audio ${audioID}`);

    return res.status(500).json({
      msg: `Failed to update audio`,
    });
  }
};

const deleteAllAudiosByUserID = async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const result = await AudioModel.deleteMany({ userID });

    return res.status(200).json({
      msg: `Delete all audios of user ${userID} successfully`,
      count: result.deletedCount,
    });
  } catch (error) {
    console.error(`Failed to delete all audios of user ${userID} successfully`);

    return res.status(500).json({
      msg: `Failed to delete all audios of user ${userID}`,
    });
  }
};

const deleteAudioByID = async (mediaValue) => {
  const startIndex = mediaValue.indexOf(process.env.CLOUD_UPLOAD_PRESET);
  const endIndex = mediaValue.lastIndexOf(".");
  const publicID = mediaValue.substring(startIndex, endIndex);

  cloudinary.config({
    cloud_name: process.env.CLOUD_STORAGE_NAME,
    api_key: process.env.CLOUD_STORAGE_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });

  cloudinary.uploader.destroy(publicID);

  await AudioModel.findOneAndDelete({
    audioUrl: mediaValue,
  });
};

const fetchUserSpecificAudioQuantity = async (req, res, next) => {
  const userID = req.params.userID;
  const limit = req.query.limit;

  try {
    const audioQuantity = await AudioModel.find({ userID }).limit(limit);
    return res.status(200).json({
      msg: `Successfully get audio of user ${userID}`,
      data: audioQuantity,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Failed to get audio of user ${userID}`,
    });
  }
};

module.exports = {
  getAllAudiosByUserID,
  deleteAllAudiosByUserID,
  deleteAudioByID,
  getAudioByID,
  updateAudioByUserID,
  uploadAudioByUserID,
  fetchUserSpecificAudioQuantity,
};
