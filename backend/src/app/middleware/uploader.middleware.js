const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_STORAGE_NAME,
  api_key: process.env.CLOUD_STORAGE_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.CLOUD_FOLDER_NAME,
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
