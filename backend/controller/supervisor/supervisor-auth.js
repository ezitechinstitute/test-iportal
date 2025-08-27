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

const SupervisorAuth = (req, res) => {
  const { email, password } = req.body.value;

  const sql =
    "SELECT `eti_id`, `manager_id`, `image`, `name`, `email`, `loginas`, `emergency_contact` FROM `manager_accounts` WHERE `email` = ? AND `password`= ? AND `loginas` = 'Supervisor' AND `status` = 1";

  connection.query(sql, [email, password], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      if (data.length > 0) {
        const token = jwt.sign({ email: data[0].email }, secretKey, {
          expiresIn: 86400,
        });
        return res.json({ isLoggedIn: true, user: data[0], token }); // Changed to data[0] for consistency
      } else {
        return res.json({ isLoggedIn: false });
      }
    }
  });
};

// Update Avatar
const SupervisorAvatar = [
  verifyToken,
  (req, res) => {
    const { image } = req.body;
    const managerId = req.params.managerId;

    if (!image || !image.startsWith("data:image/")) {
      return res.status(400).json({ 
        error: "Image is required and must be in Base64 format (e.g., data:image/jpeg;base64,...)" 
      });
    }

    const sql = `
      UPDATE \`manager_accounts\` 
      SET \`image\` = ? 
      WHERE \`manager_id\` = ? 
      AND \`loginas\` = 'Supervisor' 
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

// Update Profile (including password and emergency_contact)
const SupervisorUpdateProfile = [verifyToken, (req, res) => {
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
    `UPDATE \`manager_accounts\` SET ${updates.join(", ")} WHERE \`manager_id\` = ? AND \`loginas\` = 'Supervisor' AND \`status\` = 1`;

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

// Get Supervisor Profile (including password and emergency_contact)
const SupervisorGetProfile = [verifyToken, (req, res) => {
  const managerId = req.params.managerId;

  const sql = 
    "SELECT `manager_id`, `image`, `name`, `email`, `contact`, `password`, `loginas`, `emergency_contact` FROM `manager_accounts` WHERE `manager_id` = ? AND `loginas` = 'Supervisor' AND `status` = 1";
  
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

module.exports = { SupervisorAuth, SupervisorGetProfile, SupervisorAvatar, SupervisorUpdateProfile };