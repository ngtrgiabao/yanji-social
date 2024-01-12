const ImageModel = require("../models/image.model");

const validateImageID = async (req, res, next) => {
  const imgID = req.params.imgID;

  try {
    const result = await ImageModel.findById(imgID);

    if (!result) {
      console.error(`Image ID not found!, please check your image ID`);

      return res.status(404).json({
        msg: "Image ID not found, please check your image ID",
      });
    }

    next();
  } catch (error) {
    console.error("Failed to validate image ID", error);

    return res.status(500).json({
      msg: `An error occured while validate image ID`,
    });
  }
};

module.exports = { validateImageID };
