const { connection } = require("../../config/connection");

const CreateWithdrawReq = (req, res) => {
  const { etiId, bank, acNo, acName, description, date, amount, reqBy } =
    req.body.request;

  const values = [etiId, reqBy, bank, acNo, acName, description, date, amount];

  const sql =
    "INSERT INTO `withdraw_requests`(`eti_id`, `req_by`, `bank`, `ac_no`, `ac_name`, `description`, `date`, `amount`) VALUES (?)";
  connection.query(sql, [values], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Withdraw Request Created", data: data });
  });
};

const GetSupWithdrawReq = (req, res) => {
  const { supid } = req.params;
  const sql = "SELECT * FROM `withdraw_requests` WHERE `req_by` = ?";
  connection.query(sql, [supid], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = {
  CreateWithdrawReq,
  GetSupWithdrawReq,
};
