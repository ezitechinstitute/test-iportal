// const { auth } = require("./firebaseAdmin");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const CheckMailVerified = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token)
      return res.json({ success: false, message: "Token is required" });

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    res.json({
      success: true,
      message: "Email verified successfully!",
      email: decoded.email,
    });
  } catch (error) {
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = CheckMailVerified;
