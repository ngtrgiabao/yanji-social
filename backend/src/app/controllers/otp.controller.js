const generateOTP = require("../utils/generateOTP");

class OtpController {
    resendOtp = async (req, res) => {
        try {
            const otpCode = generateOTP();
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 5);

            console.log({ otpCode, expirationTime })

            return res.status(200).json({ otpCode, expirationTime });
        } catch (error) {
            console.log("[RESEND_OTP]", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

const otpController = new OtpController();

module.exports = {
    otpController,
};