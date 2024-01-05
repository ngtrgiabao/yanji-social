const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const VideoModel = require("../models/video.model");

const getAllVideosByUserID = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const videos = await VideoModel.find({
      userID,
    });

    return res.status(200).json({
      msg: "Get all videos successfully",
      data: videos,
    });
  } catch (error) {
    console.error(`Failed to get all videos of user ${userID}`, error);

    return res.status(500).json({
      msg: `Failed to get all videos of user ${userID}`,
    });
  }
};

const getVideoByID = async (req, res, next) => {
  const videoID = req.params.videoID;

  try {
    const result = await VideoModel.findById(videoID);

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error(`Failed to get video ${videoID}`);

    return res.status(500).json({
      msg: `Failed to get video ${videoID}`,
    });
  }
};

const uploadVideoByUserID = async (userID, videoUrl) => {
  VideoModel.create({
    userID,
    videoUrl,
  })
    .then((data) => {
      console.log("Uploaded video successfully", data);
    })
    .catch((error) => {
      console.error("Failed to upload video", error);
    });
};

const updateVideoByUserID = async (req, res, next) => {
  const videoID = req.params.videoID;
  const userID = req.params.userID;

  try {
    const { newVideo } = req.body;
    const videoModel = await VideoModel.findById({ videoID, userID });

    videoModel.video = newVideo || VideoModel.video;

    const updatedVideo = await VideoModel.save();

    return res.status(200).json({
      msg: `Updates video successfully`,
      data: updatedVideo,
    });
  } catch (error) {
    console.error(`Failed to update video ${videoID}`);

    return res.status(500).json({
      msg: `Failed to update video`,
    });
  }
};

const deleteAllVideosByUserID = async (req, res, next) => {
  const userID = req.params.userID;
  try {
    const result = await VideoModel.deleteMany({ userID });

    return res.status(200).json({
      msg: `Delete all videos of user ${userID} successfully`,
      count: result.deletedCount,
    });
  } catch (error) {
    console.error(`Failed to delete all videos of user ${userID} successfully`);

    return res.status(500).json({
      msg: `Failed to delete all videos of user ${userID}`,
    });
  }
};

const deleteVideoByID = async (mediaValue) => {
  const startIndex = mediaValue.indexOf(process.env.CLOUD_UPLOAD_PRESET);
  const endIndex = mediaValue.lastIndexOf(".");
  const publicID = mediaValue.substring(startIndex, endIndex);

  cloudinary.config({
    cloud_name: process.env.CLOUD_STORAGE_NAME,
    api_key: process.env.CLOUD_STORAGE_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });

  cloudinary.uploader.destroy(publicID);

  await VideoModel.findOneAndDelete({
    videoUrl: { $regex: mediaValue },
  });
};

module.exports = {
  getAllVideosByUserID,
  deleteAllVideosByUserID,
  deleteVideoByID,
  getVideoByID,
  uploadVideoByUserID,
  updateVideoByUserID,
};
