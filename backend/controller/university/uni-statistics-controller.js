const { connection } = require("../../config/connection");

/* Intern Statistics */
const UniCountAllInterns = (req, res) => {
  const { uniName } = req.params;
  const sql =
    "SELECT COUNT(*) as allInterns FROM `intern_table` WHERE `university` = ?";
  connection.query(sql, [uniName], (err, data) => {
    if (err) throw err;
    return res.json(data[0].allInterns);
  });
};

const UniCountAllActive = (req, res) => {
  const { uniName } = req.params;
  const sql =
    "SELECT COUNT(*) as activeInterns FROM `intern_table` WHERE `status` = 'Active' AND `university` = ?";
  connection.query(sql, [uniName], (err, data) => {
    if (err) throw err;
    return res.json(data[0].activeInterns);
  });
};

const UniCountAllProjects = (req, res) => {
  const { uniName } = req.params;
  const sql =
    "SELECT COUNT(*) as allProjects FROM `intern_projects` JOIN intern_accounts ON intern_projects.eti_id = intern_accounts.eti_id JOIN intern_table ON intern_accounts.email = intern_table.email WHERE intern_table.university = ?";
  connection.query(sql, [uniName], (err, data) => {
    if (err) throw err;
    return res.json(data[0].allProjects);
  });
};

const UniCountAllTasks = (req, res) => {
  const { uniName } = req.params;
  const sql =
    "SELECT COUNT(*) as allTasks FROM `intern_tasks` JOIN intern_accounts ON intern_tasks.eti_id = intern_accounts.eti_id JOIN intern_table ON intern_accounts.email = intern_table.email WHERE intern_table.university = ?";
  connection.query(sql, [uniName], (err, data) => {
    if (err) throw err;
    return res.json(data[0].allTasks);
  });
};

// Project Statistics
const CountOngoingProj = (req, res) => {
    const sql =
      "SELECT COUNT(*) as ongoingProjects FROM `intern_projects` WHERE `pstatus` = 'Ongoing'";
    connection.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data[0].ongoingProjects);
    });
  };

module.exports = {
  UniCountAllInterns,
  UniCountAllActive,
  UniCountAllProjects,
  UniCountAllTasks,
};
