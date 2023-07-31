const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");

const ImageController = require("../controllers/image.controller");

router.get("/", (req, res) => {
    res.send({
        msg: "Hello from image",
    });
});
router.get(
    "/all-images/:userID",
    UserMiddleware.validateUserById,
    ImageController.getAllImagesByUserID
);
router.get("/image/:imgID", ImageController.getImageByID);

module.exports = router;
