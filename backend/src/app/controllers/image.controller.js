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

const deleteImageByID = async (req, res, next) => {
    const imgID = req.params.imgID;

    await ImageModel.findByIdAndDelete(imgID);

    return res.status(200).json({
        msg: `Delete image ${imgID} successfully`,
    });
};

module.exports = {
    getAllImagesByUserID,
    deleteAllImagesByUserID,
    deleteImageByID,
    getImageByID,
    updateImageByUserID,
};
