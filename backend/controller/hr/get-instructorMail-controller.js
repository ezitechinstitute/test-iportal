const { connection } = require("../../config/connection");

const GetInstructorEmail = (req, res) => {
  const sql =
    "SELECT `email` FROM `manager_accounts` WHERE `loginas` = 'Instructor'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetManagerEmail = (req, res) => {
  const sql =
    "SELECT `email` FROM `manager_accounts` WHERE `loginas` = 'Manager'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = { GetInstructorEmail, GetManagerEmail };
