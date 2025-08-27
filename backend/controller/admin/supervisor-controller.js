const { connection } = require("../../config/connection");

const CreateSupervisor = (req, res) => {
  const { etiId, name, email, password, joinDate, role, department } =
    req.body.supervisor;
  const sql =
    "INSERT INTO `manager_accounts`(`eti_id`, `name`, `email`, `join_date`, `password`, `loginas`, `department`) VALUES (?)";
  const supervisorData = [
    etiId,
    name,
    email,

    joinDate,
    password,
    role,
    department,
  ];
  connection.query(sql, [supervisorData], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json("Supervisor Added Successfuly");
    }
  });
};

const GetSupervisors = (req, res) => {
  const sql = "SELECT * FROM `manager_accounts` WHERE `loginas` = 'Supervisor'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetSingleSupervisor = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `manager_accounts` WHERE `manager_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const UpdateSupervisor = (req, res) => {
  const { supid } = req.params;
  console.log(supid);
  const { name, email, password, comission, department } = req.body;

  const sql =
    "UPDATE `manager_accounts` SET `name`= ?,`email`= ?, `password`= ?,`comission`= ?, `department` = ? WHERE `manager_id` = ?";
  connection.query(
    sql,
    [name, email, password, comission, department, supid],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      } else {
        console.log(data);
        return res.json(data.affectedRows);
      }
    }
  );
};

const FreezeSupervisor = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `manager_accounts` SET `status`= 0 WHERE `manager_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

const ActiveSupervisor = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `manager_accounts` SET `status`= 1 WHERE `manager_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

const GetSupervisorsPermissions = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT sup_p_id, technology, internship_type, technologies.tech_id FROM `supervisor_permissions` JOIN technologies ON supervisor_permissions.tech_id = technologies.tech_id WHERE `manager_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const AssignSupervisorPermissions = (req, res) => {
  const selectedData = req.body.selectedData;

  // Create an array to store promises
  const promises = [];

  // Loop through the selectedData and create promises for each operation
  for (const perm of selectedData) {
    const { tech_id, internship_type, managerId } = perm;

    const checkPermission = new Promise((resolve, reject) => {
      const sql0 =
        "SELECT `tech_id`, `internship_type` FROM `supervisor_permissions` WHERE `manager_id` = ? AND `tech_id` = ? AND `internship_type` = ?";
      connection.query(
        sql0,
        [managerId, tech_id, internship_type],
        (reje, resl) => {
          if (reje) {
            return reject(reje);
          }

          if (resl.length > 0) {
            return resolve({ msg: "Permission Already Assigned!!!" });
          } else {
            const sql1 =
              "INSERT INTO `supervisor_permissions`(`tech_id`, `internship_type`, `manager_id`) VALUES (?, ?, ?)";
            connection.query(
              sql1,
              [tech_id, internship_type, managerId],
              (err, data) => {
                if (err) {
                  return reject(err);
                }
                resolve({ msg: "Permission Assigned", data });
              }
            );
          }
        }
      );
    });

    // Add each promise to the array
    promises.push(checkPermission);
  }

  // Use Promise.all to wait for all operations to complete
  Promise.all(promises)
    .then((results) => {
      // All operations completed successfully
      res.json({ msg: "Permissions Processed", results });
    })
    .catch((error) => {
        console.log(error)
      // Handle any error that occurred during any of the operations
      res.status(500).json({ error: "An error occurred", details: error });
    });
};

const RemoveSupervisorPermissions = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM `supervisor_permissions` WHERE `sup_p_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Permission Removed!!!");
    }
  });
};

module.exports = {
  CreateSupervisor,
  GetSupervisors,
  GetSingleSupervisor,
  UpdateSupervisor,
  FreezeSupervisor,
  ActiveSupervisor,
  GetSupervisorsPermissions,
  AssignSupervisorPermissions,
  RemoveSupervisorPermissions,
};
