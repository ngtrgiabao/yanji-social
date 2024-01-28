const express = require("express");
const router = express.Router();

const { userMiddleware } = require("../middleware/user.middleware");

const { imageController } = require("../controllers/image.controller");

router.get("/", (req, res) => {
  res.send({
    msg: "Hello from image :D",
  });
});
router.get(
  "/all-images/:userID",
  userMiddleware.validateUserById,
  imageController.getAllImagesByUserID,
);
router.get("/image/:imgID", imageController.getImageByID);
router.get("/all-images", imageController.getAllImages)

module.exports = router;
