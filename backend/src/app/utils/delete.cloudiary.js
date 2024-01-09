const cloudinary = require("cloudinary").v2;

const deleteOnCloudiary = async (mediaValue, isAudio) => {
  let startIndex = mediaValue.indexOf(process.env.CLOUD_UPLOAD_PRESET);
  if (isAudio) {
    startIndex = mediaValue.indexOf(process.env.CLOUD_UPLOAD_PRESET_AUDIO);
  }
  const endIndex = mediaValue.lastIndexOf(".");
  const publicID = mediaValue.substring(startIndex, endIndex);

  cloudinary.config({
    cloud_name: process.env.CLOUD_STORAGE_NAME,
    api_key: process.env.CLOUD_STORAGE_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });

  await cloudinary.uploader.destroy(publicID);
};

module.exports = { deleteOnCloudiary };
