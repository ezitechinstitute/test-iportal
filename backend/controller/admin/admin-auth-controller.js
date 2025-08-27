const { connection } = require("../../config/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const AdminAuth = (req, res) => {
  const { email, password } = req.body.value;
  const loginAs = "Admin";

  const sql =
    "SELECT `name`, `email`, `password`, `loginas`  FROM `admin_accounts` WHERE `email` = ? AND `password`= ? AND `loginas` = ?";

  connection.query(sql, [email, password, loginAs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      if (data.length > 0) {
        const token = jwt.sign({ email: data[0].email }, secretKey, {
          expiresIn: 86400,
        });
        return res.json({ isLoggedIn: true, user: data, token });
      } else {
        return res.json({ isLoggedIn: false });
      }
    }
  });
};

module.exports = { AdminAuth };
