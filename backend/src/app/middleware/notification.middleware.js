const Noti = require("../models/notification.model");

const validateNotiID = async (req, res, next) => {
  const notiID = req.params.notiID;

  try {
    const checkValidNotiID = await Noti.findById(notiID);

    if (!checkValidNotiID) {
      return res.status(400).json({
        msg: "Noti ID not found!",
      });
    }

    next();
  } catch (error) {
    console.error("Failed to validate noti ID", error);

    return res.status(500).json({
      msg: "Failed to validate noti ID",
      error,
    });
  }
};

module.exports = {
  validateNotiID,
};
