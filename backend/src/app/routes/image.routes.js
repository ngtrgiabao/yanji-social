const express = require("express");
const router = express.Router();
const fs = require("fs");

const ImageModel = require("../models/image.model");

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

router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const newImage = new ImageModel({
                imgName: req.body.imgName,
                image: {
                    data: req.file.filename,
                    contentType: "image/png" || "image/jpg" || "image/jpeg",
                },
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

module.exports = router;
