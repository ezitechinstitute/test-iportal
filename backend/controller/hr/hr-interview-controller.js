const { connection } = require("../../config/connection");
const SendMail = require("../../mail/mailer-controller");

const SendMaessage = (req, res) => {};

const GetInterview = (req, res) => {
  const { interviewFilter } = req.body.value;

  const sql = "SELECT * FROM `intern_table` WHERE `interview_type` = (?)";
  connection.query(sql, [interviewFilter], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const AssignTest = (req, res) => {
  const { email } = req.body;

  const sql = "UPDATE `intern_table` SET `status`='Test' WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data.affectedRows);
    }
  });
};

const RemoveIntern = (req, res) => {
  const { email } = req.body;

  const sql = "UPDATE `intern_table` SET `status`='Removed' WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data.affectedRows);
    }
  });
};

const GetTestComplete = (req, res) => {
  const { email } = req.params;

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT * FROM `complete_test` WHERE (`technology` = 'WordPress' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `status` = 'Completed'";
    connection.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
    });
  }
  const sql =
    "SELECT * FROM `complete_test` WHERE `technology` NOT IN ('WordPress', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `status` = 'Completed'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const RemoveCompletedInterns = (req, res) => {
  const { email } = req.body;
  const sql = "UPDATE `intern_table` SET `status`='Removed' WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ status: true, msg: "Removed Successfully" });
    }
  });
};

const MarkAsContact = (req, res) => {
  const { email } = req.body;

  const sql = "UPDATE `intern_table` SET `status`='Contact' WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data.affectedRows);
    }
  });
};

module.exports = {
  AssignTest,
  RemoveIntern,
  GetInterview,
  GetTestComplete,
  RemoveCompletedInterns,
  MarkAsContact,
};
