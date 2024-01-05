const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");
const AudioMiddleware = require("../middleware/audio.middleware");

const AudioController = require("../controllers/audio.controller");

router.get("/", (req, res) => {
  res.send({
    msg: "Hello from audio",
  });
});
router.get(
  "/all-audios/:userID",
  UserMiddleware.validateUserById,
  AudioController.getAllAudiosByUserID,
);
router.get(
  "/:audioID",
  AudioMiddleware.validateAudioID,
  AudioController.getAudioByID,
);

router.post(
  "/upload/:userID",
  UserMiddleware.validateUserById,
  AudioController.uploadAudioByUserID,
);

router.put(
  "/update/:audioID",
  AudioMiddleware.validateAudioID,
  AudioController.updateAudioByUserID,
);

router.delete(
  "/delete/all-audios/:userID",
  UserMiddleware.validateUserById,
  AudioController.deleteAllAudiosByUserID,
);
router.delete(
  "/delete/:audioID",
  AudioMiddleware.validateAudioID,
  AudioController.deleteAudioByID,
);

module.exports = router;
