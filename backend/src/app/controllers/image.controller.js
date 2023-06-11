const cloudinary = require("cloudinary").v2;

const ImageModel = require("../models/image.model");

const getAllImagesByUserID = async (req, res, next) => {
    const userID = req.params.userID;

    try {
        const images = await ImageModel.find({
            userID,
        });

        return res.status(200).json({
            msg: "Get all images successfully",
            data: images,
        });
    } catch (error) {
        console.error(`Failed to get all images of user ${userID}`, error);

        return res.status(500).json({
            msg: `Failed to get all images of user ${userID}`,
        });
    }
};

const getImageByID = async (req, res, next) => {
    const imgID = req.params.imgID;

    try {
        const result = await ImageModel.findById(imgID);

        return res.status(200).json({
            data: result,
        });
    } catch (error) {
        console.error(`Failed to get image ${imgID}`);

        return res.status(500).json({
            msg: `Failed to get image ${imgID}`,
        });
    }
};

const uploadImageByUserID = async (userID, imageUrl) => {
    ImageModel.create({
        userID,
        imageUrl,
    })
        .then((data) => {
            console.log("Uploaded image successfully", data);
        })
        .catch((error) => {
            console.error("Failed to upload image", error);
        });
};

const updateImageByUserID = async (req, res, next) => {
    const imgID = req.params.imgID;
    const userID = req.params.userID;

    try {
        const { newImage } = req.body;
        const imageModel = await ImageModel.findById({ imgID, userID });

        imageModel.image = newImage || imageModel.image;

        const updatedImage = await imageModel.save();

        return res.status(200).json({
            msg: `Updates image successfully`,
            data: updatedImage,
        });
    } catch (error) {
        console.error(`Failed to update image ${imgID}`);

        return res.status(500).json({
            msg: `Failed to update image`,
        });
    }
};

const deleteAllImagesByUserID = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const result = await ImageModel.deleteMany({ userID });

        return res.status(200).json({
            msg: `Delete all images of user ${userID} successfully`,
            count: result.deletedCount,
        });
    } catch (error) {
        console.error(
            `Failed to delete all images of user ${userID} successfully`
        );

        return res.status(500).json({
            msg: `Failed to delete all images of user ${userID}`,
        });
    }
};

const deleteImageByID = async (mediaValue) => {
    const startIndex = mediaValue.indexOf(process.env.CLOUD_UPLOAD_PRESET);

    const endIndex = mediaValue.lastIndexOf(".");
    const pathWithoutExtension = mediaValue.substring(startIndex, endIndex);

    cloudinary.uploader.destroy(pathWithoutExtension);

    console.log("Delete image successfully");
};

module.exports = {
    getAllImagesByUserID,
    deleteAllImagesByUserID,
    deleteImageByID,
    getImageByID,
    updateImageByUserID,
    uploadImageByUserID,
};
