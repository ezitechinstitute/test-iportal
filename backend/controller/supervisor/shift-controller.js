const { connection } = require("../../config/connection");

const AssignShift = (req, res) => {
  const { internId, internEmail, shiftType, startShift, endShift } =
    req.body.shift;

  const shiftData = [internId, internEmail, startShift, endShift, shiftType];

  const sql =
    "INSERT INTO `shift_table`(`eti_id`, `intern_email`, `start_shift`, `end_shift`, `onsite_remote`) VALUES (?)";
  connection.query(sql, [shiftData], (err, data) => {
    if (err) {
      return res.json({ msg: err.sqlMessage });
    } else {
      return res.json({ msg: "Shift Assigned Successfuly" });
    }
  });
};

const UpdateShift = (req, res) => {
  const { check } = req.params;
  const { internId, shiftType, startShift, endShift } = req.body.shift;

  const sql =
    "UPDATE `shift_table` SET `start_shift`= ?,`end_shift`= ?,`onsite_remote`= ? WHERE `eti_id` = ? AND `intern_email` = ?";

  connection.query(
    sql,
    [startShift, endShift, shiftType, internId, check],
    (err, data) => {
      if (err) throw err;
      return res.json({ msg: "Shift Update Successfuly" });
    }
  );
};

module.exports = { AssignShift, UpdateShift };
