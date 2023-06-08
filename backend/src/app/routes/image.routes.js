const express = require("express");
const router = express.Router();

const ImageController = require("../controllers/image.controller");

const UserMiddleware = require("../middleware/user.middleware");
const ImageMiddleware = require("../middleware/image.middleware");
const UploaderMiddleware = require("../middleware/uploader.middleware");

router.post(
    "/upload/:userID",
    UserMiddleware.validateUserById,
    UploaderMiddleware.single("newImage"),
    ImageController.uploadImageByUserID
);

router.get(
    "/all-images/:userID",
    UserMiddleware.validateUserById,
    ImageController.getAllImagesByUserID
);
router.get(
    "/:imgID",
    ImageMiddleware.validateImageID,
    ImageController.getImageByID
);

router.put(
    "/update/:imgID/:userID",
    ImageMiddleware.validateImageID,
    ImageController.updateImageByUserID
);

router.delete(
    "/delete/all-images/:userID",
    UserMiddleware.validateUserById,
    ImageController.deleteAllImagesByUserID
);
router.delete(
    "/delete/:imgID",
    ImageMiddleware.validateImageID,
    ImageController.deleteImageByID
);

module.exports = router;
