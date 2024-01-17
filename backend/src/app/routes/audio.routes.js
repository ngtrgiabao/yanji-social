const express = require("express");
const router = express.Router();

const { userMiddleware } = require("../middleware/user.middleware");
const { audioMiddleware } = require("../middleware/audio.middleware");

const { audioController } = require("../controllers/audio.controller");

router.get("/", (req, res) => {
  res.send({
    msg: "Hello from audio :D",
  });
});
router.get(
  "/all-audios/:userID",
  userMiddleware.validateUserById,
  audioController.getAllAudiosByUserID,
);
router.get(
  "/:audioID",
  audioMiddleware.validateAudioID,
  audioController.getAudioByID,
);

router.post("/upload", audioController.uploadAudioByUserID);

router.put(
  "/update/:audioID",
  audioMiddleware.validateAudioID,
  audioController.updateAudioByUserID,
);

router.delete(
  "/delete/all-audios/:userID",
  userMiddleware.validateUserById,
  audioController.deleteAllAudiosByUserID,
);
router.delete(
  "/delete/:audioID",
  audioMiddleware.validateAudioID,
  audioController.deleteAudioByID,
);

module.exports = router;
