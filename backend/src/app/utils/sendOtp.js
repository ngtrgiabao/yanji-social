const nodemailer = require("nodemailer");

const generateOTP = require("./generateOTP");

const emailService = async (otpCode, emailReceiver) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PWD_GMAIL,
    },
  });

  const emailContent = `
      <h1>Thank you for your Register</h1>
      <p>To complete your registration, please use the following OTP code:</p>
      
      <div style="background-color: #4285f4; color: #ffffff; font-size: 24px; padding: 10px; display: inline-block;">
        ${otpCode}
      </div>
      
      <p>This code will expire in a short period, so please use it promptly.</p>
      <p>Thank you for your register at Yanji Social 🥰 !</p>
    `;

  let info = await transporter.sendMail({
    from: '"Yanji Social" "yanjisocial@gmail.com"',
    to: emailReceiver,
    subject: "[Yanji Social] Verify OTP Code",
    text: "Hello",
    html: emailContent, //mail body
  });
};

const withEmail = async (email) => {
  try {
    const otpCode = generateOTP();
    // emailService(otpCode, email);

    return { otpCode };
  } catch (error) {
    console.log("Failed to sent gmail", error);
  }
};

const verifyOTP = {
  withEmail: withEmail,
};

module.exports = verifyOTP;
