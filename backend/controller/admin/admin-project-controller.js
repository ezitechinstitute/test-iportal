const { connection } = require("../../config/connection");

const AdminIntProjects = (req, res) => {
  //   const { supid } = req.params;
  const sql =
    "SELECT ip.*, ia.name, ia.email, ia.int_technology, COUNT(pt.task_id) as taskCount FROM `intern_projects` ip JOIN `intern_accounts` ia ON ip.eti_id = ia.eti_id LEFT JOIN `project_tasks` pt ON ip.project_id = pt.project_id AND pt.eti_id = ia.eti_id GROUP BY ip.project_id, ia.eti_id";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const AdminIntProjectTasks = (req, res) => {
  //   const { supid } = req.params;
  const sql =
    "SELECT pt.*, ia.name, ia.int_technology, ip.* FROM project_tasks pt JOIN intern_accounts ia ON pt.eti_id = ia.eti_id JOIN intern_projects ip ON pt.project_id = ip.project_id";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const AdminIntTasks = (req, res) => {
  //   const { supid } = req.params;
  const sql =
    "SELECT it.*, ia.name, ia.int_technology FROM intern_tasks it JOIN intern_accounts ia ON it.eti_id = ia.eti_id";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = {
  AdminIntProjects,
  AdminIntProjectTasks,
  AdminIntTasks,
};
