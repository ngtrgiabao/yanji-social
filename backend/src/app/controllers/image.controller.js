const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const ImageModel = require("../models/image.model");

class ImageController {
  getAllImagesByUserID = async (req, res, next) => {
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

  getAllImages = async (req, res, next) => {
    try {
      const images = await ImageModel.find();
      return res.status(200).json({
        msg: "Get all images successfully",
        quantity: images.length,
        data: images,
      });
    } catch(error) {
      console.error(`Failed to get all images`, error);

      return res.status(500).json({
        msg: `Failed to get all images`,
      });
    }
  }

  getImageByID = async (req, res, next) => {
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

  uploadImageByUserID = async (userID, imageUrl) => {
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

  updateImageByUserID = async (req, res, next) => {
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

  deleteAllImagesByUserID = async (req, res, next) => {
    const userID = req.params.userID;
    try {
      const result = await ImageModel.deleteMany({ userID });

      return res.status(200).json({
        msg: `Delete all images of user ${userID} successfully`,
        count: result.deletedCount,
      });
    } catch (error) {
      console.error(
        `Failed to delete all images of user ${userID} successfully`,
      );

      return res.status(500).json({
        msg: `Failed to delete all images of user ${userID}`,
      });
    }
  };

  deleteImageByID = async (mediaValue) => {
    // const pathWithoutExtension = mediaValue.split("/").pop().split(".")[0];
    const startIndex = mediaValue.indexOf(process.env.CLOUD_UPLOAD_PRESET);
    const endIndex = mediaValue.lastIndexOf(".");
    const publicID = mediaValue.substring(startIndex, endIndex);

    cloudinary.config({
      cloud_name: process.env.CLOUD_STORAGE_NAME,
      api_key: process.env.CLOUD_STORAGE_API_KEY,
      api_secret: process.env.CLOUD_SECRET_KEY,
    });

    cloudinary.uploader.destroy(publicID);

    await ImageModel.findOneAndDelete({
      imageUrl: mediaValue,
    });
  };

  fetchUserSpecificImageQuantity = async (req, res, next) => {
    const userID = req.params.userID;
    const limit = parseInt(req.query.limit);

    try {
      const imageQuantity = await ImageModel.find({ userID }).limit(limit);

      return res.status(200).json({
        msg: `Successfully get image of user ${userID}`,
        data: imageQuantity,
      });
    } catch (error) {
      return res.status(500).json({
        msg: `Failed to get image of user ${userID}`,
      });
    }
  };
}

const imageController = new ImageController();

module.exports = {
  imageController,
};
