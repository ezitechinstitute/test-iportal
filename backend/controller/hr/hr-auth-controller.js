const { connection } = require("../../config/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Get HR Profile (including password)
const HrGetProfile = [verifyToken, (req, res) => {
  const managerId = req.params.managerId;

  const sql = 
    "SELECT `manager_id`, `image`, `name`, `email`, `contact`, `password`, `loginas`, `emergency_contact` FROM `manager_accounts` WHERE `manager_id` = ? AND `loginas` = 'Manager' AND `status` = 1";
  
  connection.query(sql, [managerId], (err, data) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (data.length > 0) {
      return res.status(200).json({ success: true, user: data[0] });
    }
    return res.status(404).json({ success: false, message: "Profile not found" });
  });
}];

// Authentication
const HrAuth = (req, res) => {
  const { email, password } = req.body.value || req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql =
    "SELECT `manager_id`, `eti_id`, `image`, `name`, `email`, `contact`, `password`, `loginas` FROM `manager_accounts` WHERE `email` = ? AND `password`= ? AND `loginas` = 'Manager' AND `status` = 1";

  connection.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    
    if (data.length > 0) {
      const token = jwt.sign({ email: data[0].email, id: data[0].manager_id }, secretKey, {
        expiresIn: "24h"
      });
      return res.status(200).json({ 
        isLoggedIn: true, 
        user: {
          manager_id: data[0].manager_id,
          eti_id: data[0].eti_id,
          image: data[0].image,
          name: data[0].name,
          email: data[0].email,
          contact: data[0].contact
        }, 
        token 
      });
    }
    return res.status(401).json({ isLoggedIn: false, message: "Invalid credentials" });
  });
};

// Forgot Password
const HrForgotPassword = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and new password are required" });
  }

  const sql = 
    "UPDATE `manager_accounts` SET `password`= ? WHERE `email` = ? AND `loginas` = 'Manager' AND `status` = 1";
  
  connection.query(sql, [password, email], (err, data) => {
    if (err) {
      console.error("Password update error:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (data.affectedRows > 0) {
      return res.status(200).json({ success: true, message: "Password updated successfully" });
    }
    return res.status(404).json({ success: false, message: "User not found" });
  });
};

// Update Avatar
const HrAvatar = [
  verifyToken,
  (req, res) => {
    const { image } = req.body; // Expecting image as Base64 string (e.g., "data:image/jpeg;base64,/9j/...")
    const managerId = req.params.managerId;

    // Validate that image is provided and is in Base64 format
    if (!image || !image.startsWith("data:image/")) {
      return res.status(400).json({ 
        error: "Image is required and must be in Base64 format (e.g., data:image/jpeg;base64,...)" 
      });
    }

    // SQL query to update the image field with the Base64 string
    const sql = `
      UPDATE \`manager_accounts\` 
      SET \`image\` = ? 
      WHERE \`manager_id\` = ? 
      AND \`loginas\` = 'Manager' 
      AND \`status\` = 1
    `;

    connection.query(sql, [image, managerId], (err, data) => {
      if (err) {
        console.error("Avatar update error:", err);
        return res.status(500).json({ 
          error: "Database error", 
          details: err.message 
        });
      }
      
      if (data.affectedRows > 0) {
        return res.status(200).json({ 
          success: true, 
          message: "Avatar updated successfully" 
        });
      }
      
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    });
  }
];

// Update Profile (including password)
const HrUpdateProfile = [verifyToken, (req, res) => {
  const managerId = req.params.managerId;
  const { name, contact, password, emergency_contact } = req.body;

  const updates = [];
  const values = [];
  
  if (name) {
    updates.push("`name` = ?");
    values.push(name);
  }
  if (contact) {
    updates.push("`contact` = ?");
    values.push(contact);
  }
  if (password) {
    updates.push("`password` = ?");
    values.push(password);
  }
  if (emergency_contact) {
    updates.push("`emergency_contact` = ?");
    values.push(emergency_contact);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  values.push(managerId);
  const sql = 
    `UPDATE \`manager_accounts\` SET ${updates.join(", ")} WHERE \`manager_id\` = ? AND \`loginas\` = 'Manager' AND \`status\` = 1`;

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Profile update error:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    if (data.affectedRows > 0) {
      return res.status(200).json({ success: true, message: "Profile updated successfully" });
    }
    return res.status(404).json({ success: false, message: "User not found" });
  });
}];

module.exports = {
  HrGetProfile,
  HrAuth,
  HrForgotPassword,
  HrAvatar,
  HrUpdateProfile,
};