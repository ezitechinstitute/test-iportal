const { connection } = require("../../config/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const path = require("path"); // You need this for multer filenames
const multer = require("multer");
const dotenv = require("dotenv").config();

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';

// Affiliate Login 
const loginAffiliate = async (req, res) => {
  try {
    const { loginEmail: email, loginPassword: password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM affiliates WHERE email = ? AND status = 'active'";
    connection.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });

      if (results.length === 0) {
        return res.status(401).json({ isLoggedIn: false, message: "You don't have an account yet." });
      }

      const affiliate = results[0];
      const isMatch = await bcrypt.compare(password, affiliate.password);

      if (!isMatch) {
        return res.status(401).json({ isLoggedIn: false, message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: affiliate.email, id: affiliate.id }, secretKey, { expiresIn: "24h" });

      return res.status(200).json({
        isLoggedIn: true,
        loginStatus: true,
        passwordStatus: true,
        userStatus: true,
        user: {
          affiliate_id: affiliate.id,
          name: affiliate.name,
          email: affiliate.email,
          referral_code: affiliate.referral_code,
          bank_info: affiliate.bank_info
        },
        token
      });
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Login failed", details: error.message });
  }
};

// Affiliate Registration 
const registerAffiliate = async (req, res) => {
  try {
    const {
      affiliate_Username,
      affiliate_email,
      name: nameFromBody,
      email: emailFromBody,
      password
    } = req.body;

    const name = affiliate_Username || nameFromBody;
    const email = affiliate_email || emailFromBody;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    connection.query("SELECT * FROM affiliates WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });
      if (results.length > 0) return res.status(409).json({ error: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 8);

      const generateReferralCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };

      const generateUniqueReferralCode = (callback) => {
        const referralCode = generateReferralCode();
        connection.query("SELECT * FROM affiliates WHERE referral_code = ?", [referralCode], (err, data) => {
          if (err) return res.status(500).json({ error: "Database error", details: err });
          if (!data || data.length === 0) {
            callback(referralCode);
          } else {
            generateUniqueReferralCode(callback);
          }
        });
      };

      // unique referral code generation
      generateUniqueReferralCode((referralCode) => {
        const insertSql = `
            INSERT INTO affiliates (name, email, password, referral_code, status, join_date)
            VALUES (?, ?, ?, ?, 'active', NOW())`;

        connection.query(insertSql, [name, email, hashedPassword, referralCode], (err, result) => {
          if (err) return res.status(500).json({ error: "Registration failed", details: err });

          const token = jwt.sign({ email, id: result.insertId }, secretKey, { expiresIn: "24h" });

          return res.status(201).json({
            message: "Affiliate registered successfully",
            user: {
              affiliate_id: result.insertId,
              name,
              email,
              referral_code: referralCode
            },
            token
          });
        });
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

// Get profile
const getProfile = (req, res) => {
  const affiliateId = req.user.id;
  const sql = "SELECT id AS affiliate_id, profile_image, name, email, referral_code, bank_info FROM affiliates WHERE id = ?";

  connection.query(sql, [affiliateId], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch profile", details: err });
    if (results.length === 0) return res.status(404).json({ message: "Affiliate not found" });

    return res.json({ profile: results[0] });
  });
};

// Update basic profile Info...........................
const updateProfile = (req, res) => {
  const affiliateId = req.user.id;
  const { name, address, city, postal_code } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  if (!name || !address || !city || !postal_code) {
    return res.status(400).json({ error: "All profile fields are required" });
  }

  let sql, params;
  if (profileImage) {
    sql = `
      UPDATE affiliates 
      SET name = ?, address = ?, city = ?, postal_code = ?, profile_image = ?
      WHERE id = ?
    `;
    params = [name, address, city, postal_code, profileImage, affiliateId];
  } else {
    sql = `
      UPDATE affiliates 
      SET name = ?, address = ?, city = ?, postal_code = ?
      WHERE id = ?
    `;
    params = [name, address, city, postal_code, affiliateId];
  }

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Failed to update profile", details: err });
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  });
};

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });



// Update bank info
const updateBankInfo = (req, res) => {
  const affiliateId = req.user.id;
  const { bankName, accountNumber, accountTitle } = req.body;

  if (!bankName || !accountNumber || !accountTitle) {
    return res.status(400).json({ error: "All bank details are required" });
  }

  const bankInfo = JSON.stringify({ bankName, accountNumber, accountTitle });
  const sql = "UPDATE affiliates SET bank_info = ? WHERE id = ?";

  connection.query(sql, [bankInfo, affiliateId], (err, result) => {
    if (err) return res.status(500).json({ error: "Update failed", details: err });
    return res.json({ message: "Bank info updated successfully" });
  });
};

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@example.com',
    pass: process.env.SMTP_PASS || 'your-email-password'
  }
});

// Generate reset token (1 hour expiration)
const generateResetToken = () => {
  return {
    token: crypto.randomBytes(32).toString('hex'),
    expiresAt: new Date(Date.now() + 3600000) // 1 hour
  };
};

// Send password reset email
const sendResetEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'no-reply@yourdomain.com',
      to: email,
      subject: 'Password Reset Request - Affiliate-iPortal',
      html: `
        <p>You requested a password reset for your Affiliate-iPortal account.</p>
        <p>Click this link to reset your password (valid for 1 hour):</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });
    return true;
  } catch (error) {
    console.error("Error sending reset email:", error);
    return false;
  }
};

// Forgot password request handler
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    connection.query("SELECT id FROM affiliates WHERE email = ? AND status = 'active'", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Return same response regardless of email existence for security
      if (results.length === 0) {
        return res.status(200).json({ message: "If the email exists, a reset link has been sent" });
      }

      const affiliate = results[0];
      const { token, expiresAt } = generateResetToken();

      // Store token in database (create table if not exists)
      connection.query(
        "INSERT INTO affiliate_pass_reset (user_id, token, expires_at) VALUES (?, ?, ?)",
        [affiliate.id, token, expiresAt],
        async (err) => {
          if (err) {
            console.error("Error storing reset token:", err);
            return res.status(500).json({ error: "Failed to process reset request" });
          }

          const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
          const emailSent = await sendResetEmail(email, resetLink);

          if (!emailSent) {
            return res.status(500).json({ error: "Failed to send reset email" });
          }

          return res.status(200).json({
            message: "Password reset link sent to your email",
            // Don't return token in production
            token: process.env.NODE_ENV === 'development' ? token : undefined
          });
        }
      );
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Reset password handler
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Verify token validity
    connection.query(
      `SELECT pr.user_id, a.email 
       FROM affiliate_pass_reset pr
       JOIN affiliates a ON pr.user_id = a.id
       WHERE pr.token = ? AND pr.expires_at > NOW()`,
      [token],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
          return res.status(400).json({ error: "Invalid or expired token" });
        }

        const { user_id, email } = results[0];
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        // Update password
        connection.query(
          "UPDATE affiliates SET password = ? WHERE id = ?",
          [hashedPassword, user_id],
          (err) => {
            if (err) {
              console.error("Error updating password:", err);
              return res.status(500).json({ error: "Failed to update password" });
            }

            // Delete used token
            connection.query("DELETE FROM affiliate_pass_reset WHERE token = ?", [token], (err) => {
              if (err) console.error("Error deleting token:", err);
              return res.status(200).json({ message: "Password updated successfully" });
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Change password controller
const changePassword = (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userEmail = req.user.email;
  //  console.log('User from token:', userEmail);


  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  connection.query('SELECT * FROM affiliates WHERE email = ?', [userEmail], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Old password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 8);

    // Update password
    connection.query('UPDATE affiliates SET password = ? WHERE id = ?', [hashedNewPassword, user.id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating password' });
      }

      return res.status(200).json({ message: 'Password changed successfully' });
    });
  });
};





// Delete account controller
const deleteAccount = async (req, res) => {
  try {
    const userEmail = req.user.email; 
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    connection.query("SELECT password FROM affiliates WHERE email = ?", [userEmail], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, results[0].password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      connection.query("DELETE FROM affiliates WHERE email = ?", [userEmail], (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Error deleting account" });
        }
        res.json({ message: "Account deleted successfully" });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  loginAffiliate,
  registerAffiliate,
  updateBankInfo,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteAccount
};
