const AudioModel = require("../models/audio.model");

class AudioMiddleware {
  validateAudioID = async (req, res, next) => {
    const audioID = req.params.audioID;

    try {
      const result = await AudioModel.findById(audioID);

      if (!result) {
        console.error(`Audio ID not found!, please check your audio ID`);

        return res.status(404).json({
          msg: "Audio ID not found, please check your audio ID",
        });
      }

      next();
    } catch (error) {
      console.error("Failed to validate audio ID", error);

      return res.status(500).json({
        msg: `An error occured while validate audio ID`,
      });
    }
  };
}

const audioMiddleware = new AudioMiddleware();

module.exports = { audioMiddleware };
