const { connection } = require("../../config/connection");
const bcrypt = require("bcryptjs");
const { SendMailUniAccount } = require("../../mail/mailer-controller");

const GetUniversities = (req, res) => {
  const sql =
    "SELECT uni.*, COUNT(it.id) AS uniInterns FROM universities uni LEFT JOIN intern_table it ON uni.uni_name = it.university GROUP BY uni.uni_name";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const ActiveUni = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE `universities` SET `uni_status`= 1 WHERE `uni_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Activated successfuly" });
  });
};

const FreezeUni = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE `universities` SET `uni_status`= 0 WHERE `uni_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Freezed successfuly" });
  });
};

const CreateUniAccount = (req, res) => {
  const { id } = req.params;
  const { name, etiid, email, password, phone } = req.body.uniData;

  let hashPassword = " ";
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) throw err;
    hashPassword = hash;

    const sql =
      "UPDATE `universities` SET `uti`= ?, `uni_email`= ?,`uni_password`= ?,`uni_phone`= ?, `account_status`= 1 WHERE `uni_id` = ?";
    connection.query(
      sql,
      [etiid, email, hashPassword, phone, id],
      (err, data) => {
        if (err) throw err;
        SendMailUniAccount(name, email, password);
        return res.json({ msg: "Account created Successfuly" });
      }
    );
  });
};

const DeactivateUniAccount = (req, res) => {
  const { id } = req.params;
  const sql =
    "UPDATE `universities` SET `account_status`= 0 WHERE `uni_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Account deactivated successfuly" });
  });
};

const ActivateUniAccount = (req, res) => {
  const { id } = req.params;
  const sql =
    "UPDATE `universities` SET `account_status`= 1 WHERE `uni_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Account activated successfuly" });
  });
};

const AddNewUni = (req, res) => {
  const { uniName } = req.body.values;

  const sql = "INSERT INTO `universities`(`uni_name`) VALUES (?)";
  connection.query(sql, [uniName], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "University added successfuly" });
  });
};

const UpdateUniData = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password, newPassword } = req.body.edit;

  if (newPassword) {
    let hashPassword = " ";
    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) throw err;
      hashPassword = hash;

      const sql =
        "UPDATE `universities` SET `uni_name`= ?, `uni_email`= ?,`uni_password`= ?,`uni_phone`= ? WHERE `uni_id` = ?";
      connection.query(
        sql,
        [name, email, hashPassword, phone, id],
        (err, data) => {
          if (err) throw err;
          return res.json({ msg: "Updated successfuly" });
        }
      );
    });
  } else {
    const sql =
      "UPDATE `universities` SET `uni_name`= ?, `uni_email`= ?,`uni_password`= ?,`uni_phone`= ? WHERE `uni_id` = ?";
    connection.query(sql, [name, email, password, phone, id], (err, data) => {
      if (err) throw err;
      return res.json({ msg: "Updated successfuly" });
    });
  }
};

module.exports = {
  GetUniversities,
  CreateUniAccount,
  DeactivateUniAccount,
  ActivateUniAccount,
  ActiveUni,
  FreezeUni,
  AddNewUni,
  UpdateUniData,
};
