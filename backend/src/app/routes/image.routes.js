const express = require("express");
const router = express.Router();

const ImageModel = require("../models/image.model");

const ImageController = require("../controllers/image.controller");

const UserMiddleware = require("../middleware/user.middleware");
const ImageMiddleware = require("../middleware/image.middleware");

const multer = require("multer");

// Create a storage object that will store the uploaded files in the `uploads` directory.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/app/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Create the upload middleware using the storage object.
const upload = multer({ storage: storage }).single("newImage");

router.post("/upload/:userID", UserMiddleware.validateUserById, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const userID = req.params.userID;

            const newImage = new ImageModel({
                imgName: req.body.imgName,
                image: {
                    data: req.file.filename,
                    contentType: "image/png" || "image/jpg" || "image/jpeg",
                },
                userID,
            });

            newImage
                .save()
                .then(() => {
                    console.log("Upload image successfully");
                    return res.status(200).json({
                        msg: "Upload image successfully",
                    });
                })
                .catch((err) => {
                    console.log("Failed to upload image", err);
                    return res.status(500).json({
                        msg: "Failed upload image",
                    });
                });
        }
    });
});

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
