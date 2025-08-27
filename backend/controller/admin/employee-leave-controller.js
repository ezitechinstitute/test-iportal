const { connection } = require("../../config/connection");

const GetEmployeeLeaves = (req, res) => {
  const sql = "SELECT * FROM `employe_leaves`";

  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const LeaveApprove = (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE employe_leaves SET status = 1 WHERE id = ${id}`;

  connection.query(sql, (err, leave_approve) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Your leave is approved" });
    }
  });
};

const LeaveReject = (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE employe_leaves SET status = 0 WHERE id = ${id}`;

  connection.query(sql, (err, leave_reject) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ msg: "Your leave is rejected" });
    }
  });
};

module.exports = {
  GetEmployeeLeaves,
  LeaveApprove,
  LeaveReject,
};
