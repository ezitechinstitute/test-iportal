const { connection } = require("../../config/connection");
const { SendMailVerifyCode } = require("../../mail/mailer-controller");

const VerifyUniEmail = (req, res) => {
  const { email } = req.body;

  // Email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ msg: "Invalid email address" });
  }

  const sql = "SELECT * FROM `universities` WHERE `uni_email` = ?";

  connection.query(sql, [email], (err, data) => {
    if (err) throw err;

    if (data.length > 0) {
      const generateVerificationCode = () =>
        Math.floor(1000 + Math.random() * 9000);
      const verificationCode = generateVerificationCode();

      const sql =
        "INSERT INTO `verification_code`(`email`, `code`) VALUES (?, ?)";
      connection.query(sql, [email, verificationCode], (err, data) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              msg: "Verification email already sent. Check your mailbox.",
            });
          }
          return res
            .status(500)
            .json({ msg: "Database error. Try again later." });
        }
        SendMailVerifyCode(email, verificationCode);
        res
          .status(200)
          .json({ msg: "Verification email sent. Check your mailbox." });
      });
    } else {
      return res.status(400).json({ msg: "Invalid email address" });
    }
  });
};

const VerifyInternEmail = (req, res) => {
  const { email } = req.body;

  // res.send(req.body);

  // Email validation
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.json({ msg: "Invalid email address" });
  }

  const sql = "SELECT * FROM `intern_table` WHERE `email` = ?";

  connection.query(sql, [email], (err, data) => {
    if (err) throw err;

    if (data.length > 0) {
      return res.status(400).json({ msg: "Email already register" });
    } else {
      const generateVerificationCode = () =>
        Math.floor(1000 + Math.random() * 9000);
      const verificationCode = generateVerificationCode();

      const sql =
        "INSERT INTO `verification_code`(`email`, `code`) VALUES (?, ?)";
      connection.query(sql, [email, verificationCode], (err, data) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              msg: "Verification email already sent. Check your mailbox.",
            });
          }
          return res
            .status(500)
            .json({ msg: "Database error. Try again later." });
        }
        SendMailVerifyCode(email, verificationCode);
        res
          .status(200)
          .json({ msg: "Verification email sent. Check your mailbox." });
      });
    }
  });
};

const VerifyCode = (req, res) => {
  const { email, code } = req.body.data;

  const sql = "SELECT `code` FROM `verification_code` WHERE `email` = ?";

  if (code !== undefined && email !== undefined) {
    connection.query(sql, [email], (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        if (data[0].code !== parseInt(code)) {
          return res.json({ isVerify: false });
        } else {
          return res.json({ isVerify: true });
        }
      }
    });
  } else {
    return res.json({ isVerify: false });
  }
};

const DeleteVerificationCode = (email) => {
  const sql = "DELETE FROM `verification_code` WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("Code Deleted");
    }
  });
};

const DeleteCodeAtMidNight = () => {
  const sql = "DELETE FROM `verification_code`";

  connection.query(sql, (err, data) => {
    if (err) throw err;
    console.log("Code removed!!!");
  });
};

module.exports = {
  VerifyUniEmail,
  DeleteVerificationCode,
  DeleteCodeAtMidNight,
  VerifyCode,
  VerifyInternEmail,
};
