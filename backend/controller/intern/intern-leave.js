const { connection } = require("../../config/connection");

const SubmitLeaveReq = (req, res) => {
  const { id, intName, intEmail, fromDate, toDate, reason, durationDays } =
    req.body.data;
  const ReqData = [
    id,
    intName,
    intEmail,
    fromDate,
    toDate,
    reason,
    durationDays,
  ];

  const sql =
    "INSERT INTO `intern_leaves`(`eti_id`, `name`, `email`, `from_date`, `to_date`, `reason`, `days`) VALUES (?)";
  connection.query(sql, [ReqData], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Leave Submitted Succeccfully" });
  });
};

const GetLeaves = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT * FROM `intern_leaves` WHERE `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = { SubmitLeaveReq, GetLeaves };
