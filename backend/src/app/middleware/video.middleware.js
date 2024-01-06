const VideoModel = require("../models/video.model");

const validateVideoID = async (req, res, next) => {
  const videoID = req.params.videoID;

  try {
    const result = await VideoModel.findById(videoID);

    if (!result) {
      console.error(`Video ID not found!, please check your video ID`);

      return res.status(404).json({
        msg: "Video ID not found, please check your video ID",
      });
    }

    next();
  } catch (error) {
    console.error("Failed to validate video ID", error);

    return res.status(500).json({
      msg: `An error occured while validate video ID`,
    });
  }
};

module.exports = { validateVideoID };
