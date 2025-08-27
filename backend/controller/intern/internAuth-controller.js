const { connection } = require("../../config/connection");
const { sendPasswordResetEmail } = require("../../mail/forget_password");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const secretKey = process.env.SECRETKEY;

// Existing controllers
const InternAuth = (req, res) => {
  if (
    !req.body.values ||
    !req.body.values.loginEmail ||
    !req.body.values.loginPassword
  ) {
    return res
      .status(400)
      .json({ error: "Missing loginEmail or loginPassword" });
  }

  const { loginEmail, loginPassword } = req.body.values;

  const sql =
    "SELECT ia.*, it.technology, it.intern_type, it.join_date, it.duration FROM intern_accounts ia JOIN intern_table it ON ia.email = it.email  WHERE ia.email = ?";
  connection.query(sql, [loginEmail], (err, data) => {
    if (err) throw err;

    if (data.length === 0) {
      return res.json({ userStatus: false });
    }

    const intern = data[0];
    const isPasswordValid = bcrypt.compareSync(loginPassword, intern.password);
    if (!isPasswordValid) {
      return res.json({ passwordStatus: false });
    }

    const token = jwt.sign({ email: intern.email }, secretKey, {
      expiresIn: 86400,
    });
    return res.json({ loginStatus: true, token, intern });
  });
};

const ForgotInternPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: "30m" });

    const sql = "UPDATE `intern_accounts` SET `reset_token`=? WHERE `email`=?";
    connection.query(sql, [resetToken, email], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error occurred." });
      }

      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Email not found." });
      }

      // let resetLink = `http://localhost:3000/intern-reset-password/${resetToken}`;
      let resetLink = `https://interns.ezitech.org/intern-reset-password/${resetToken}`;

      sendPasswordResetEmail(email, resetLink)
        .then(() => {
          return res
            .status(200)
            .json({ message: "Password reset email sent!" });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send reset email." });
        });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const ResetInternPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const actualToken = token.token;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required." });
    }

    const decoded = jwt.verify(actualToken, secretKey);
    const email = decoded.email;

    const hashPassword = await bcrypt.hash(newPassword, 8);

    const sql =
      "UPDATE `intern_accounts` SET `password`=?, `reset_token`=NULL WHERE `email`=?";
    connection.query(sql, [hashPassword, email], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error occurred." });
      }

      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Email not found." });
      }

      return res.status(200).json({ message: "Password reset successfully!" });
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Reset token has expired." });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
};

// New controllers
// 1. Get and update image from intern_table
const GetAndUpdateInternImage = async (req, res) => {
  try {
    const { email, image } = req.body;

    if (!email || !image) {
      return res.status(400).json({ error: "Email and image are required." });
    }

    const sql = "UPDATE `intern_table` SET `image`=? WHERE `email`=?";
    connection.query(sql, [image, email], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error occurred." });
      }

      if (data.affectedRows === 0) {
        return res.status(404).json({ error: "Email not found." });
      }

      return res.status(200).json({ message: "Image updated successfully!" });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// 2. Get name, email, password, and contact from intern_accounts and intern_table (matching email)
const GetInternDetails = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const sql =
      "SELECT ia.name, ia.email, ia.password, ia.phone, it.image FROM intern_accounts ia JOIN intern_table it ON ia.email = it.email WHERE ia.email = ?";
    connection.query(sql, [email], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error occurred." });
      }

      if (data.length === 0) {
        return res.status(404).json({ error: "Email not found." });
      }

      return res.status(200).json({ internDetails: data[0] });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// 3. Update name, email, and contact for both tables, and update password only in intern_accounts
const UpdateInternDetails = async (req, res) => {
  try {
    const { oldEmail, newEmail, name, phone, password } = req.body;

    if (!oldEmail) {
      return res.status(400).json({ error: "Old email is required." });
    }

    // Hash the new password if provided
    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 8);
    }

    // Update intern_accounts table
    const updateAccountsSql = `
      UPDATE intern_accounts 
      SET name = ?, email = ?, phone = ?, password = ?
      WHERE email = ?
    `;
    connection.query(
      updateAccountsSql,
      [name, newEmail || oldEmail, phone, hashPassword || null, oldEmail],
      (err, data) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error occurred." });
        }

        if (data.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "Email not found in intern_accounts." });
        }

        // Update intern_table table
        const updateTableSql = `
          UPDATE intern_table 
          SET name = ?, email = ?, phone = ?
          WHERE email = ?
        `;
        connection.query(
          updateTableSql,
          [name, newEmail || oldEmail, phone, oldEmail],
          (err, data) => {
            if (err) {
              console.error("Database error:", err);
              return res
                .status(500)
                .json({ error: "Database error occurred." });
            }

            if (data.affectedRows === 0) {
              return res
                .status(404)
                .json({ error: "Email not found in intern_table." });
            }

            return res
              .status(200)
              .json({ message: "Intern details updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  InternAuth,
  ForgotInternPassword,
  ResetInternPassword,
  GetAndUpdateInternImage,
  GetInternDetails,
  UpdateInternDetails,
};
