const { SendMailVerifyCode } = require("../mail/mailer-controller");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const GetVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.json({ success: false, message: "Email is required" });

    // Generate JWT token (valid for 15 minutes)
    const token = jwt.sign({ email }, process.env.SECRETKEY, {
      expiresIn: "15m",
    });

    // Verification link
    const verificationLink = `https://register.ezitech.org/email-verified?token=${token}`;
    SendMailVerifyCode(email, verificationLink);
    res.json({ msg: "Verification email sent!" });
  } catch (error) {
    // console.error("Error sending verification email:", error.message);
    res.json({ msg: error.message });
  }
};

module.exports = GetVerificationLink;
