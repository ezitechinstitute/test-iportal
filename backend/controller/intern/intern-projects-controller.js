const { connection } = require("../../config/connection");
const cron = require("node-cron");
const moment = require("moment-timezone");
const { DateTime } = require("luxon"); // Install luxon for better date handling

const GetInternProjects = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT * FROM `intern_projects` WHERE `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetInternProjectTask = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT pt.*, ia.name, ip.* FROM `project_tasks` pt JOIN intern_accounts ia ON pt.eti_id = ia.eti_id JOIN intern_projects ip ON pt.project_id = ip.project_id WHERE pt.eti_id = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetProjectDetail = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT title, description FROM `intern_projects` WHERE `project_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetTaskDetail = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT task_title, task_description FROM `intern_tasks` WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const CreateTask = (req, res) => {
  const {
    projectId,
    id,
    taskTitle,
    startDate,
    endDate,
    durationDays,
    points,
    supid,
  } = req.body.task;

  const values = [
    projectId,
    id,
    taskTitle,
    startDate,
    endDate,
    durationDays,
    supid,
  ];

  const sql =
    "INSERT INTO `project_tasks`(`project_id`, `eti_id`, `task_title`, `t_start_date`, `t_end_date`, `task_duration`, `assigned_by`) VALUES (?)";
  connection.query(sql, [values], (err, data) => {
    if (err) throw err;
    let lastId = data.insertId;

    const sql =
      "SELECT COUNT(*) as tasksCount FROM `project_tasks` WHERE `project_id` = ?";
    connection.query(sql, [projectId], (reject, resolve) => {
      if (err) throw err;
      if (resolve[0].tasksCount <= 3) {
        let taskPoint = points / resolve[0].tasksCount;

        const sql =
          "UPDATE `project_tasks` SET `task_mark` = ? WHERE `project_id` = ?";
        connection.query(sql, [taskPoint, projectId], (err, result) => {
          if (err) throw err;
          return res.json({ msg: "Task created successfully" });
        });
      } else {
        DeleteExtraTask(lastId);
        return res.json({ msg: "Task limit exceeds!!!" });
      }
    });
  });
};

const GetInternTasks = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT * FROM intern_tasks WHERE intern_tasks.eti_id = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const TaskDayIncrement = (req, res) => {
  console.log("Intern task");
  const sql1 =
    "SELECT task_id, task_days, task_duration, task_end FROM intern_tasks WHERE task_status = 'Ongoing'";
  connection.query(sql1, (err, data1) => {
    if (err) {
      return res.json(err);
    } else {
      for (let i = 0; i < data1.length; i++) {
        const task = data1[i];
        const currentDate = DateTime.now()
          .setZone("Asia/Karachi")
          .toFormat("yyyy-MM-dd");

        if (
          task.task_days < task.task_duration ||
          task.task_end > currentDate
        ) {
          const updatedDays = task.task_days + 1;
          const sql2 =
            "UPDATE intern_tasks SET task_days = ? WHERE task_id = ?";
          connection.query(sql2, [updatedDays, task.task_id], (err, data2) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Updated task_days for task ID ${task.task_id}`);
            }
          });
        } else {
          const sql2 =
            "UPDATE intern_tasks SET task_status = 'Expired' WHERE task_id = ?";
          connection.query(sql2, [task.task_id], (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Updated task_status to 'Expired' for task ID ${task.task_id}`
              );
            }
          });
        }
      }
    }
  });
};

const ProjectTaskDayIncrement = (req, res) => {
  console.log("Project Task");
  const sql1 =
    "SELECT task_id, task_days, task_duration, t_end_date FROM project_tasks WHERE task_status = 'Ongoing'";
  connection.query(sql1, (err, data1) => {
    if (err) {
      return res.json(err);
    } else {
      for (let i = 0; i < data1.length; i++) {
        const task = data1[i];
        const currentDate = DateTime.now()
          .setZone("Asia/Karachi")
          .toFormat("yyyy-MM-dd");

        if (
          task.task_days < task.task_duration ||
          task.t_end_date > currentDate
        ) {
          const updatedDays = task.task_days + 1;
          const sql2 =
            "UPDATE project_tasks SET task_days = ? WHERE task_id = ?";
          connection.query(sql2, [updatedDays, task.task_id], (err, data2) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Updated Pproject task task_days for task ID ${task.task_id}`
              );
            }
          });
        } else {
          const sql2 =
            "UPDATE project_tasks SET task_status = 'Expired' WHERE task_id = ?";
          connection.query(sql2, [task.task_id], (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Updated project task task_status to 'Expired' for task ID ${task.task_id}`
              );
            }
          });
        }
      }
    }
  });
};

function DeleteExtraTask(id) {
  const sql = "DELETE FROM `project_tasks` WHERE `task_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return true;
  });
}

const UploadTask = (req, res) => {
  const { taskId, taskImage, liveUrl, repoUrl, description } = req.body.task;

  const sql =
    "UPDATE `intern_tasks` SET `task_screenshot`= ?, `task_live_url`= ?, `task_git_url`= ?, `submit_description`= ?, `task_status` = 'Submitted' WHERE `task_id` = ?";
  connection.query(
    sql,
    [taskImage, liveUrl, repoUrl, description, taskId],
    (err, data) => {
      if (err) throw err;
      return res.json({ msg: "Task uploaded successfuly" });
    }
  );
};

const SubmitProjectTask = (req, res) => {
  const { taskId, taskImage, liveUrl, repoUrl, description } = req.body.task;

  const sql =
    "UPDATE `project_tasks` SET `task_screenshot`= ?, `task_live_url`= ?, `task_git_url`= ?, `description`= ?, `task_status` = 'Submitted' WHERE `task_id` = ?";
  connection.query(
    sql,
    [taskImage, liveUrl, repoUrl, description, taskId],
    (err, data) => {
      if (err) throw err;
      return res.json({ msg: "Task uploaded successfuly" });
    }
  );
};

module.exports = {
  GetInternProjects,
  CreateTask,
  GetInternTasks,
  UploadTask,
  GetProjectDetail,
  GetTaskDetail,
  TaskDayIncrement,
  GetInternProjectTask,
  SubmitProjectTask,
  ProjectTaskDayIncrement,
};
