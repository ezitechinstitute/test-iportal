const { connection } = require("../../config/connection");

const CreateManager = (req, res) => {
  const { etiId, name, email, password, phone, joinDate, role } = req.body.manager;

  const sql =
    "INSERT INTO `manager_accounts`(`eti_id`, `name`, `email`, `contact`, `join_date`, `password`, `loginas`) VALUES (?)";
  const managerData = [etiId, name, email, phone, joinDate, password, role];
  connection.query(sql, [managerData], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Manager Add Successfuly");
    }
  });
};

const GetManagers = (req, res) => {
  const sql = "SELECT * FROM `manager_accounts` WHERE `loginas` = 'Manager'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetSingleManager = (req, res) => {
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

const UpdateManager = (req, res) => {
  const { id } = req.params;
  const { name, email, password, contact, comission } = req.body;

  const sql =
    "UPDATE `manager_accounts` SET `name`= ?,`email`= ?,`contact`= ?, `password`= ?,`comission`= ? WHERE `manager_id` = ?";
  connection.query(
    sql,
    [name, email, contact, password, comission, id],
    (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data.affectedRows);
      }
    }
  );
};

const FreezeManager = (req, res) => {
  const { email } = req.params;

  const sql = "UPDATE `manager_accounts` SET `status`= 0 WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

const ActiveManager = (req, res) => {
  const { email } = req.params;

  const sql = "UPDATE `manager_accounts` SET `status`= 1 WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

const GetManagerPermissions = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT manager_p_id, technology, interview_type, technologies.tech_id FROM `manager_permissions` JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE `manager_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetNewPermissionsTech = (req, res) => {
  const sql =
    "SELECT tech_id, technology FROM `technologies` WHERE `status` = 1";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const AssignPermissions = (req, res) => {
  const selectedData = req.body.selectedData;

  // Create an array to store promises
  const promises = [];

  // Loop through the selectedData and create promises for each operation
  for (const perm of selectedData) {
    const { tech_id, interview_type, managerId } = perm;

    const checkPermission = new Promise((resolve, reject) => {
      const sql0 =
        "SELECT `tech_id`, `interview_type` FROM `manager_permissions` WHERE `manager_id` = ? AND `tech_id` = ? AND `interview_type` = ?";
      connection.query(
        sql0,
        [managerId, tech_id, interview_type],
        (reje, resl) => {
          if (reje) {
            return reject(reje);
          }

          if (resl.length > 0) {
            return resolve({ msg: "Permission Already Assigned!!!" });
          } else {
            const sql1 =
              "INSERT INTO `manager_permissions`(`tech_id`, `interview_type`, `manager_id`) VALUES (?, ?, ?)";
            connection.query(
              sql1,
              [tech_id, interview_type, managerId],
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
      // Handle any error that occurred during any of the operations
      res.status(500).json({ error: "An error occurred", details: error });
    });
};

const RemovePermission = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM `manager_permissions` WHERE `manager_p_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Permission Removed!!!");
    }
  });
};

module.exports = {
  CreateManager,
  GetManagers,
  GetSingleManager,
  UpdateManager,
  FreezeManager,
  ActiveManager,
  GetManagerPermissions,
  GetNewPermissionsTech,
  AssignPermissions,
  RemovePermission,
};
