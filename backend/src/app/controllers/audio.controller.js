require("dotenv").config();

const AudioModel = require("../models/audio.model");
const User = require("../models/user.model");
const { deleteOnCloudiary } = require("../utils/delete.cloudiary");

const isValidUser = async (userID) => {
  const validUser = await User.findById(userID);
  return validUser;
};

class AudioController {
  getAllAudiosByUserID = async (req, res, next) => {
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

  getAudioByID = async (req, res, next) => {
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

  uploadAudioByUserID = async (req, res, next) => {
    const { audioUrl, userID, cover, name } = req.body;

    isValidUser(userID)
      .then(async (validUser) => {
        if (!validUser)
          return res.status(401).json({ message: "Invalid user ID" });

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
      })
      .catch((error) => {
        return res.status(500).json({
          msg: "Failed to upload new audio",
          error,
        });
      });
  };

  updateAudioByUserID = async (req, res, next) => {
    const audioID = req.params.audioID;

    try {
      const { audioUrl, cover } = req.body;
      const result = await AudioModel.findById(audioID);

      AudioModel.cover = cover || AudioModel.cover;
      AudioModel.audioUrl = audioUrl || AudioModel.audioUrl;

      const updatedAudio = await result.save();

      return res.status(200).json({
        msg: `Updates audio successfully`,
        data: updatedAudio,
      });
    } catch (error) {
      console.error(`Failed to update audio ${audioID}`, error);

      return res.status(500).json({
        msg: `Failed to update audio`,
      });
    }
  };

  deleteAllAudiosByUserID = async (req, res, next) => {
    const userID = req.params.userID;
    try {
      const result = await AudioModel.deleteMany({ userID });

      return res.status(200).json({
        msg: `Delete all audios of user ${userID} successfully`,
        count: result.deletedCount,
      });
    } catch (error) {
      console.error(
        `Failed to delete all audios of user ${userID} successfully`,
      );

      return res.status(500).json({
        msg: `Failed to delete all audios of user ${userID}`,
      });
    }
  };

  deleteAudioByID = async (req, res, next) => {
    const audioID = req.params.audioID;

    try {
      // const result = await AudioModel.findByIdAndDelete(audioID);
      const result = await AudioModel.findByIdAndDelete(audioID);

      deleteOnCloudiary(result.audioUrl, true);

      return res.status(200).json({
        msg: `Delete audio ${audioID} successfully`,
        data: result,
      });
    } catch (error) {
      console.error(`Failed to delete audio ${audioID}`);
      return res.status(500).json({
        msg: `Failed to delete audio ${audioID}`,
      });
    }
  };

  fetchUserSpecificAudioQuantity = async (req, res, next) => {
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
}

const audioController = new AudioController();

module.exports = {
  audioController,
};
