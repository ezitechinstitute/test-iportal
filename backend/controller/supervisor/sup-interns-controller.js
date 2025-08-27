const { connection } = require("../../config/connection");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { DateTime } = require("luxon"); // Install luxon for better date handling

// Update intern_account table when deploy
const GetSupervisorsInterns = (req, res) => {
  const { supid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, supervisor_permissions.internship_type FROM `intern_table` JOIN supervisor_permissions ON supervisor_permissions.internship_type = intern_table.intern_type JOIN technologies ON supervisor_permissions.tech_id = technologies.tech_id WHERE supervisor_permissions.manager_id = ?";
  connection.query(sql_0, [supid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const superTech = [];
      const superInternship = [];
      for (let i = 0; i < data.length; i++) {
        superTech.push(data[i].technology);
        superInternship.push(data[i].internship_type);
      }

      let query =
        "SELECT * FROM intern_accounts ia LEFT JOIN intern_table it ON ia.email = it.email WHERE 1 = 1";
      const techFilter = superTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iship_type = [...new Set(superInternship.map((i) => i))];

      if (iship_type.length > 0) {
        query += ` AND intern_type IN ('${iship_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Active"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (superTech.length > 0 && superInternship.length > 0) {
        // console.log(query);

        connection.query(query, [limit, offset], (reject, resolve) => {
          if (reject) {
            console.log(reject);
            return res.json(reject);
          } else {
            let countquery =
              "SELECT COUNT(*) as count FROM intern_table WHERE 1= 1";

            if (techFilter.length > 0) {
              countquery += ` AND technology IN ('${techFilter}')`;
            }

            if (iship_type.length > 0) {
              countquery += ` AND intern_type IN ('${iship_type.join("','")}')`;
            }

            if (statusFilter && statusFilter.length > 0) {
              countquery += ` AND status = '${statusFilter}'`;
            }

            connection.query(countquery, (countError, countResult) => {
              if (countError) {
                return res.json(countError);
              } else {
                const totalData = countResult[0].count;
                const totalPages = Math.ceil(totalData / limit);

                return res.json({
                  data: resolve,
                  meta: {
                    page,
                    limit,
                    totalData,
                    totalPages,
                  },
                });
              }
            });
          }
        });
      } else {
        return res.json("Something Went Wrong!!!");
      }
    }
  });
};

const AssignProject = (req, res) => {
  const {
    etiId,
    projectTitle,
    startDate,
    endDate,
    durationDays,
    points,
    description,
    supId,
  } = req.body.project;
  const sql =
    "INSERT INTO `intern_projects`(`eti_id`, `title`, `start_date`, `end_date`, `duration`, `project_marks`, `description`, `assigned_by`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    etiId,
    projectTitle,
    startDate,
    endDate,
    durationDays,
    points,
    description,
    supId,
  ];
  connection.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.send({ msg: "Project Assigned successfully", data: data });
    }
  });
};

const AssignTask = (req, res) => {
  const {
    etiId,
    taskTitle,
    startDate,
    endDate,
    durationDays,
    points,
    description,
    supId,
  } = req.body.task;
  const sql =
    "INSERT INTO `intern_tasks`(`eti_id`, `task_title`, `task_start`, `task_end`, `task_duration`, `task_points`, `task_description`, `assigned_by`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    etiId,
    taskTitle,
    startDate,
    endDate,
    durationDays,
    points,
    description,
    supId,
  ];
  connection.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.send({ msg: "Task Assigned successfully", data: data });
    }
  });
};

const GetAttendance = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countAttend FROM `intern_attendance` WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data[0].countAttend);
    }
  });
};

const CountAllProjects = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countAllProject FROM `intern_projects` WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data[0].countAllProject);
    }
  });
};

const CountCompProjects = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countCompProject FROM `intern_projects` WHERE `email` = ? AND pstatus = 'Completed'";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data[0].countCompProject);
    }
  });
};

const CountExpProjects = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countExpProject FROM `intern_projects` WHERE `email` = ? AND pstatus = 'Expire'";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      // console.log(data[0].countAttend)
      return res.json(data[0].countExpProject);
    }
  });
};

const GetProjects = (req, res) => {
  const { supid } = req.params;
  const sql =
    "SELECT ip.*, ia.name, ia.email, ia.int_technology, COUNT(pt.task_id) as taskCount FROM `intern_projects` ip JOIN `intern_accounts` ia ON ip.eti_id = ia.eti_id LEFT JOIN `project_tasks` pt ON ip.project_id = pt.project_id AND pt.eti_id = ia.eti_id WHERE ip.assigned_by = ? GROUP BY ip.project_id, ia.eti_id";
  connection.query(sql, [supid], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetTasks = (req, res) => {
  const { supid } = req.params;
  
  // Get pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;
  
  // Get filters
  const status = req.query.status || null;
  const search = req.query.search || null;

  // Base SQL query
  let sql = `
    SELECT it.*, ia.name, ia.int_technology 
    FROM intern_tasks it 
    JOIN intern_accounts ia ON it.eti_id = ia.eti_id 
    WHERE it.assigned_by = ?
  `;

  // Add status filter if provided
  if (status) {
    if (status === 'Approved') {
      sql += ` AND it.task_approve = 1`;
    } else if (status === 'Rejected') {
      sql += ` AND it.task_approve = 0`;
    } else {
      sql += ` AND it.task_status = ?`;
    }
  }

  // Add search filter if provided
  if (search) {
    sql += ` AND (ia.name LIKE ? OR it.task_title LIKE ?)`;
  }

  // Add pagination
  sql += ` LIMIT ? OFFSET ?`;

  // Prepare parameters for query
  let params = [supid];
  
  if (status && status !== 'Approved' && status !== 'Rejected') {
    params.push(status);
  }
  
  if (search) {
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam);
  }
  
  params.push(limit, offset);

  // Count query for pagination
  let countSql = `
    SELECT COUNT(*) as total
    FROM intern_tasks it 
    JOIN intern_accounts ia ON it.eti_id = ia.eti_id 
    WHERE it.assigned_by = ?
  `;

  let countParams = [supid];

  if (status) {
    if (status === 'Approved') {
      countSql += ` AND it.task_approve = 1`;
    } else if (status === 'Rejected') {
      countSql += ` AND it.task_approve = 0`;
    } else {
      countSql += ` AND it.task_status = ?`;
      countParams.push(status);
    }
  }

  if (search) {
    const searchParam = `%${search}%`;
    countSql += ` AND (ia.name LIKE ? OR it.task_title LIKE ?)`;
    countParams.push(searchParam, searchParam);
  }

  // Execute both queries
  connection.query(countSql, countParams, (err, countResult) => {
    if (err) {
      console.error("Count query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    connection.query(sql, params, (err, data) => {
      if (err) {
        console.error("Data query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      return res.json({
        data: data,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: total,
          itemsPerPage: limit
        }
      });
    });
  });
};

const GetProjectTasks = (req, res) => {
  const { supid } = req.params;
  
  // Get pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;
  
  // Get filters
  const status = req.query.status || null;
  const search = req.query.search || null;

  // Base SQL query
  let sql = `
    SELECT pt.*, ia.name, ia.int_technology, ip.title 
    FROM project_tasks pt 
    JOIN intern_accounts ia ON pt.eti_id = ia.eti_id 
    JOIN intern_projects ip ON pt.project_id = ip.project_id 
    WHERE pt.assigned_by = ?
  `;

  // Add status filter if provided
  if (status) {
    if (status === 'Approved') {
      sql += ` AND pt.approved = 1`;
    } else if (status === 'Rejected') {
      sql += ` AND pt.approved = 0`;
    } else {
      sql += ` AND pt.task_status = ?`;
    }
  }

  // Add search filter if provided
  if (search) {
    sql += ` AND (ia.name LIKE ? OR pt.task_title LIKE ? OR ip.title LIKE ?)`;
  }

  // Add pagination
  sql += ` LIMIT ? OFFSET ?`;

  // Prepare parameters for query
  let params = [supid];
  
  if (status && status !== 'Approved' && status !== 'Rejected') {
    params.push(status);
  }
  
  if (search) {
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }
  
  params.push(limit, offset);

  // Count query for pagination
  let countSql = `
    SELECT COUNT(*) as total
    FROM project_tasks pt 
    JOIN intern_accounts ia ON pt.eti_id = ia.eti_id 
    JOIN intern_projects ip ON pt.project_id = ip.project_id 
    WHERE pt.assigned_by = ?
  `;

  let countParams = [supid];

  if (status) {
    if (status === 'Approved') {
      countSql += ` AND pt.approved = 1`;
    } else if (status === 'Rejected') {
      countSql += ` AND pt.approved = 0`;
    } else {
      countSql += ` AND pt.task_status = ?`;
      countParams.push(status);
    }
  }

  if (search) {
    const searchParam = `%${search}%`;
    countSql += ` AND (ia.name LIKE ? OR pt.task_title LIKE ? OR ip.title LIKE ?)`;
    countParams.push(searchParam, searchParam, searchParam);
  }

  // Execute both queries
  connection.query(countSql, countParams, (err, countResult) => {
    if (err) {
      console.error("Count query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    connection.query(sql, params, (err, data) => {
      if (err) {
        console.error("Data query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      return res.json({
        data: data,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: total,
          itemsPerPage: limit
        }
      });
    });
  });
};

const GetSupTaskDetails = (req, res) => {
  const { tNo, intId, pId } = req.query;

  const sql =
    "SELECT st.*, it.task_title, ip.title FROM submitted_task st JOIN intern_tasks it ON st.task_no = it.task_no JOIN intern_projects ip ON st.project_id = ip.project_id WHERE st.task_no = ? AND st.project_id = ? AND st.eti_id = ?";
  connection.query(sql, [tNo, pId, intId], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};
//Get leave
const GetInterLeaves = (req, res) => {
  const { supid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
      il.leave_id,
      il.eti_id,
      il.name,
      il.from_date,
      il.to_date,
      il.reason,
      il.days,
      il.leave_status,
      il.email
    FROM 
      intern_leaves il
    LEFT JOIN 
      intern_accounts ia ON il.eti_id = ia.eti_id
    LEFT JOIN 
      supervisor_permissions sp ON sp.tech_id = (SELECT tech_id FROM technologies WHERE technology = ia.int_technology)
    WHERE 
      sp.manager_id = ?
    ORDER BY 
      il.leave_id DESC
    LIMIT ? OFFSET ?;
  `;

  connection.query(query, [supid, limit, offset], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    // Count total records for pagination
    const countQuery = `
      SELECT COUNT(*) AS totalData 
      FROM intern_leaves il
      LEFT JOIN intern_accounts ia ON il.eti_id = ia.eti_id
      LEFT JOIN supervisor_permissions sp ON sp.tech_id = (SELECT tech_id FROM technologies WHERE technology = ia.int_technology)
      WHERE sp.manager_id = ?;
    `;

    connection.query(countQuery, [supid], (countErr, countResult) => {
      if (countErr) {
        console.error(countErr);
        return res.status(500).json({ error: "Database error" });
      }

      const totalData = countResult[0].totalData;
      const totalPages = Math.ceil(totalData / limit);

      return res.json({
        data,
        meta: {
          page,
          limit,
          totalData,
          totalPages,
        },
      });
    });
  });
};

// ApproveInternLeave
const ApproveInternLeave = (req, res) => {
  const { leave_id } = req.params; // Changed from intId to leave_id

  console.log(leave_id);

  const sql =
    "UPDATE `intern_leaves` SET `leave_status`= 1 WHERE `leave_id` = ?";
  connection.query(sql, [leave_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ msg: "Leave Approved", data: data });
  });
};

// RejectInternLeave
const RejectInternLeave = (req, res) => {
  const { leave_id } = req.params; // Changed from intId to leave_id

  console.log(leave_id);

  const sql =
    "UPDATE `intern_leaves` SET `leave_status`= 0 WHERE `leave_id` = ?";
  connection.query(sql, [leave_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ msg: "Leave Rejected", data: data });
  });
};

const ProjectDayIncrement = (req, res) => {
  console.log("Project");
  const sql1 =
    "SELECT project_id, days, duration, end_date FROM intern_projects WHERE pstatus = 'Ongoing'";
  connection.query(sql1, (err, data1) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      for (let i = 0; i < data1.length; i++) {
        const project = data1[i];

        const currentDate = DateTime.now()
          .setZone("Asia/Karachi")
          .toFormat("yyyy-MM-dd");

        if (project.days < project.duration || project.end_date > currentDate) {
          console.log("Chal gya");
          const updatedDays = project.days + 1;

          console.log(updatedDays);

          const sql2 =
            "UPDATE intern_projects SET days = ? WHERE project_id = ?";
          connection.query(
            sql2,
            [updatedDays, project.project_id],
            (err, data2) => {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  `Updated days for project ID ${project.project_id}`
                );
              }
            }
          );
        } else {
          console.log("Nahi chala");
          const sql3 =
            "UPDATE intern_projects SET pstatus = 'Expired' WHERE project_id = ?";
          connection.query(sql3, [project.project_id], (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Set pstatus to 'Expired' for project ID ${project.project_id}`
              );
            }
          });
        }
      }
    }
  });
};

const GetSubmittedTasks = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM `intern_tasks` WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetSubmittedProjTasks = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM `project_tasks` WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const SubmitReview = (req, res) => {
  const { id } = req.params;
  const { points, desc } = req.body.review;

  const sql =
    "UPDATE `intern_tasks` SET `task_obt_points`= ?,`review`= ? WHERE `task_id` = ?";

  connection.query(sql, [points, desc, id], (err) => {
    if (err) throw err;
    return res.json({ msg: "Review submitted successfully" });
  });
};

const SubmitProjReview = (req, res) => {
  const { id } = req.params;
  const { points, desc } = req.body.review;

  const sql =
    "UPDATE `project_tasks` SET `task_obt_mark`= ?,`review`= ? WHERE `task_id` = ?";

  connection.query(sql, [points, desc, id], (err) => {
    if (err) throw err;
    return res.json({ msg: "Review submitted successfully" });
  });
};

const ApproveTask = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `intern_tasks` SET `task_status`= 'Approved', `task_approve` = 1 WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Task approved successfully" });
  });
};

const ApproveProjTask = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `project_tasks` SET `task_status`= 'Approved', `approved` = 1 WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Task approved successfully" });
  });
};

const RejectTask = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `intern_tasks` SET `task_status`= 'Rejected', `task_approve` = 0 WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Task rejected successfully" });
  });
};

const RejectProjTask = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `project_tasks` SET `task_status`= 'Rejected', `approved` = 0 WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ msg: "Task rejected successfully" });
  });
};

const MarkProjectComplete = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT SUM(task_obt_mark) as projectTaskSum FROM `project_tasks` WHERE `approved` = 1 AND `project_id` = ?";

  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    const obtPoints = data[0].projectTaskSum;

    if (obtPoints !== null) {
      const sql =
        "UPDATE `intern_projects` SET `obt_marks`= ?, `pstatus`= 'Completed' WHERE `project_id` = ?";
      connection.query(sql, [obtPoints, id], (err, data) => {
        if (err) throw err;
        return res.json({ message: "Project mark as completed" });
      });
    } else {
      return res.json({ message: "Project task not completed!" });
    }
  });
};

module.exports = {
  ProjectDayIncrement,
  GetSupervisorsInterns,
  AssignProject,
  AssignTask,
  GetAttendance,
  CountAllProjects,
  GetProjects,
  GetTasks,
  GetSupTaskDetails,
  CountCompProjects,
  CountExpProjects,
  GetInterLeaves,
  ApproveInternLeave,
  RejectInternLeave,
  GetSubmittedTasks,
  SubmitReview,
  ApproveTask,
  RejectTask,
  GetProjectTasks,
  GetSubmittedProjTasks,
  SubmitProjReview,
  ApproveProjTask,
  RejectProjTask,
  MarkProjectComplete,
};
