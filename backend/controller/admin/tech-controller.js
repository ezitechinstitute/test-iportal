const { connection } = require("../../config/connection");

const AddTechnology = (req, res) => {
  const { techName } = req.body.newTech;

  const sql = "INSERT INTO `technologies`(`technology`) VALUES (?)";
  connection.query(sql, [techName], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Technology Added Successfuly");
    }
  });
};

const FreezeTech = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE `technologies` SET `status`= 0 WHERE `tech_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Technology Freezed");
    }
  });
};

const ActiveTech = (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE `technologies` SET `status`= 1 WHERE `tech_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json("Technology Activated");
    }
  });
};

const GetAdminTech = (req, res) => {
  const sql = "SELECT * FROM `technologies`";

  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetFormTech = (req, res) => {
  const sql = "SELECT * FROM `technologies` WHERE `status` = 1";

  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const EditTech = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM `technologies` WHERE `tech_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const UpdateTech = (req, res) => {
  const { id } = req.params;
  const { technology } = req.body.editedData;

  const sql = "UPDATE `technologies` SET `technology`= ? WHERE `tech_id` = ?";
  connection.query(sql, [technology, id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Technolgy Updated Successfuly");
    }
  });
};

module.exports = {
  AddTechnology,
  FreezeTech,
  ActiveTech,
  GetAdminTech,
  GetFormTech,
  EditTech,
  UpdateTech,
};
