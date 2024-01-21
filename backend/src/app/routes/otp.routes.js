const express = require("express");
const router = express.Router();

const { otpController } = require("../controllers/otp.controller");

router.post("/resend-otp", otpController.resendOtp);

module.exports = router;
