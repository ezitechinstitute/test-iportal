const { connection } = require("../../config/connection");

const CountProjects = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalProjects FROM `intern_projects` WHERE `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalProjects);
  });
};

const CountInPorgressProjects = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalInProgressProjects FROM `intern_projects` WHERE `pstatus`= 'Ongoing' AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalInProgressProjects);
  });
};

const CountCompletedProjects = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalCompleteProjects FROM `intern_projects` WHERE `pstatus`= 'Completed' AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalCompleteProjects);
  });
};

const CountAttendance = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalAttendance FROM `intern_attendance` WHERE `status` = 1 AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalAttendance);
  });
};

const CountHolidays = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalHoldays FROM `intern_attendance` WHERE `status` = 0 AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalHoldays);
  });
};

const CountLeaves = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalLeaves FROM `intern_leaves` WHERE `leave_status` = 1 AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalLeaves);
  });
};

const CountTotalTasks = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT COUNT(*) as totalTasks FROM `intern_tasks` WHERE `eti_id` = ?";

  connection.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.json({ totalTasks: data[0].totalTasks });
  });
};

const CountTasksInProgress = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT COUNT(*) as totalTasksInProgress FROM `intern_tasks` WHERE `task_status` = 'ongoing' AND `eti_id` = ?";

  connection.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.json({ totalTasksInProgress: data[0].totalTasksInProgress });
  });
};

const CountTasksComplete = (req, res) => {
  const { id } = req.query;

  const sql = "SELECT COUNT(*) as totalTasksComplete FROM `intern_tasks` WHERE `task_status` = 'Approved' AND `eti_id` = ?";

  connection.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.json({ totalTasksComplete: data[0].totalTasksComplete });
  });
};






const GetInternAverage = (req, res) => {
  const { id } = req.query; 

  
  const sqlProject = `
    SELECT SUM(obt_marks) AS total_obt_marks, SUM(project_marks) AS total_marks
    FROM (SELECT obt_marks, project_marks FROM intern_projects WHERE eti_id = ? ORDER BY project_id DESC LIMIT 3) AS subquery
  `;

 
  const sqlAttendance = `
    SELECT SUM(TIMESTAMPDIFF(HOUR, start_shift, end_shift)) AS total_working_hours, 
           COUNT(*) AS total_days
    FROM intern_attendance 
    WHERE eti_id = ?
  `;

  connection.query(sqlProject, [id], (err, projectData) => {
    if (err) {
      console.error("Error querying project data:", err);
      return res.status(500).json({ message: 'Error querying project data', error: err.message });
    }

    if (!projectData || projectData.length === 0 || projectData[0].total_marks === 0) {
      return res.status(404).json({ message: 'No valid project data found for the given intern.' });
    }

   
    const totalObtMarks = projectData[0].total_obt_marks || 0;
    const totalMarks = projectData[0].total_marks || 1; 
    const internProjectAverage = (totalObtMarks / totalMarks) * 100;


    connection.query(sqlAttendance, [id], (err, attendanceData) => {
      if (err) {
        console.error("Error querying attendance data:", err);
        return res.status(500).json({ message: 'Error querying attendance data', error: err.message });
      }

      const totalWorkingHours = attendanceData[0].total_working_hours || 0;
      const totalDays = attendanceData[0].total_days || 1; 
      const expectedTotalHours = totalDays * 3;
      let attendancePercentage = (totalWorkingHours / expectedTotalHours) * 100;

      
      attendancePercentage = Math.min(attendancePercentage, 100);

      let finalAverage = (internProjectAverage * 0.8) + (attendancePercentage * 0.15);

     
      finalAverage = Math.min(finalAverage, 100);

    
      finalAverage = parseFloat(finalAverage.toFixed(1));

     
      return res.json({ final_average: finalAverage });
    });
  });
};


const calculateInternAverage = (id, callback) => {
  const sqlProject = `
    SELECT SUM(obt_marks) AS total_obt_marks, SUM(project_marks) AS total_marks
    FROM (SELECT obt_marks, project_marks FROM intern_projects WHERE eti_id = ? ORDER BY project_id DESC LIMIT 3) AS subquery
  `;

  const sqlAttendance = `
    SELECT SUM(TIMESTAMPDIFF(HOUR, start_shift, end_shift)) AS total_working_hours, 
           COUNT(*) AS total_days
    FROM intern_attendance 
    WHERE eti_id = ?
  `;

  connection.query(sqlProject, [id], (err, projectData) => {
    if (err) return callback(err);

    const totalObtMarks = projectData[0].total_obt_marks || 0;
    const totalMarks = projectData[0].total_marks || 1;
    const internProjectAverage = (totalObtMarks / totalMarks) * 100;

    connection.query(sqlAttendance, [id], (err, attendanceData) => {
      if (err) return callback(err);

      const totalWorkingHours = attendanceData[0].total_working_hours || 0;
      const totalDays = attendanceData[0].total_days || 1;
      const expectedTotalHours = totalDays * 3;
      let attendancePercentage = (totalWorkingHours / expectedTotalHours) * 100;

      attendancePercentage = Math.min(attendancePercentage, 100);
      let finalAverage = (internProjectAverage * 0.8) + (attendancePercentage * 0.15);
      finalAverage = Math.min(finalAverage, 100);
      finalAverage = parseFloat(finalAverage.toFixed(1));

      callback(null, finalAverage);
    });
  });
};

// Modified controller
const GetTopInternByAverage = (req, res) => {
  
  const sqlInterns = `
    SELECT 
      ia.eti_id,
      it.image,
      it.name,
      it.technology,
      it.email
    FROM intern_table it
    INNER JOIN intern_accounts ia ON it.email = ia.email 
    WHERE ia.int_status = 'Active'
  `;


  connection.query(sqlInterns, (err, interns) => {
    if (err) {
      console.error("Error fetching interns:", err);
      return res.status(500).json({ 
        message: "Error fetching interns", 
        error: err.message 
      });
    }

    if (!interns || interns.length === 0) {
      return res.status(404).json({ 
        message: "No interns found" 
      });
    }

    let processedInterns = 0;
    const internsWithAverage = [];

    // Calculate average for each intern using eti_id
    interns.forEach((intern) => {
      calculateInternAverage(intern.eti_id, (err, average) => {
        if (err) {
          console.error(`Error calculating average for intern ${intern.eti_id}:`, err);
          processedInterns++;
          return;
        }

        internsWithAverage.push({
          eti_id: intern.eti_id,
          image: intern.image,
          name: intern.name,
          technology: intern.technology,
          email: intern.email,
          average: average
        });

        processedInterns++;

        // When all interns are processed, find the top one
        if (processedInterns === interns.length) {
          if (internsWithAverage.length === 0) {
            return res.status(404).json({ 
              message: "No valid intern data available" 
            });
          }

          // Sort by average in descending order and get the top intern
          const topIntern = internsWithAverage.sort((a, b) => b.average - a.average)[0];

          return res.json({
            top_intern: {
              eti_id: topIntern.eti_id,
              image: topIntern.image,
              name: intern.name,
              technology: topIntern.technology,
              email: topIntern.email,
              average: topIntern.average
            }
          });
        }
      });
    });
  });
};


// const GetAllInternsByAverage = (req, res) => {
//   // Query to fetch all interns from accounts_table
//   const sqlInterns = `SELECT intern_id, name, email, department FROM accounts_table`;

//   connection.query(sqlInterns, (err, interns) => {
//     if (err) {
//       console.error("Error fetching interns:", err);
//       return res.status(500).json({ message: "Error fetching interns", error: err.message });
//     }

//     if (!interns || interns.length === 0) {
//       return res.status(404).json({ message: "No interns found." });
//     }

//     let processedInterns = 0;
//     let recommendedInterns = [];
//     let notRecommendedInterns = [];

//     interns.forEach((intern) => {
//       const internId = intern.intern_id;

//       // Query to calculate project average
//       const sqlProject = `
//         SELECT SUM(obt_marks) AS total_obt_marks, SUM(project_marks) AS total_marks
//         FROM (SELECT obt_marks, project_marks FROM intern_projects WHERE eti_id = ? ORDER BY project_id DESC LIMIT 3) AS subquery
//       `;

//       // Query to calculate attendance percentage
//       const sqlAttendance = `
//         SELECT SUM(TIMESTAMPDIFF(HOUR, start_shift, end_shift)) AS total_working_hours, 
//                COUNT(*) AS total_days
//         FROM intern_attendance 
//         WHERE eti_id = ?
//       `;

//       connection.query(sqlProject, [internId], (err, projectData) => {
//         if (err) {
//           console.error(`Error querying project data for intern ${internId}:`, err);
//           return;
//         }

//         const totalObtMarks = projectData[0]?.total_obt_marks || 0;
//         const totalMarks = projectData[0]?.total_marks || 1; // Avoid division by zero
//         const internProjectAverage = (totalObtMarks / totalMarks) * 100;

//         connection.query(sqlAttendance, [internId], (err, attendanceData) => {
//           if (err) {
//             console.error(`Error querying attendance data for intern ${internId}:`, err);
//             return;
//           }

//           const totalWorkingHours = attendanceData[0]?.total_working_hours || 0;
//           const totalDays = attendanceData[0]?.total_days || 1; // Avoid division by zero
//           const expectedTotalHours = totalDays * 3;
//           let attendancePercentage = (totalWorkingHours / expectedTotalHours) * 100;

//           attendancePercentage = Math.min(attendancePercentage, 100); // Cap at 100%

//           // Calculate final average
//           let finalAverage = (internProjectAverage * 0.9) + (attendancePercentage * 0.1);
//           finalAverage = Math.min(finalAverage, 100);
//           finalAverage = parseFloat(finalAverage.toFixed(1)); // Keep one decimal place

//           // Categorize intern
//           const internData = { ...intern, final_average: finalAverage };
//           if (finalAverage >= 90) {
//             recommendedInterns.push(internData);
//           } else {
//             notRecommendedInterns.push(internData);
//           }

//           processedInterns++;
//           if (processedInterns === interns.length) {
//             return res.json({
//               recommended: recommendedInterns,
//               not_recommended: notRecommendedInterns
//             });
//           }
//         });
//       });
//     });
//   });
// };

// module.exports = { GetAllInternsByAverage };








// const GetInternWeeklyReport = (req, res) => {
//   const { eti_id } = req.params;

//   const sql = `
//     SELECT
//       ia.eti_id,
//       -- Week Start: First day of ISO week
//       STR_TO_DATE(CONCAT(YEARWEEK(att.created_at, 1), ' Monday'), '%X%V %W') AS week_start,
//       -- Week End: Week start + 6 days
//       DATE_ADD(STR_TO_DATE(CONCAT(YEARWEEK(att.created_at, 1), ' Monday'), '%X%V %W'), INTERVAL 6 DAY) AS week_end,

//       -- Attendance for the week
//       COUNT(DISTINCT att.id) AS attendance_days,

//       -- General tasks for the same week
//       (
//         SELECT COUNT(DISTINCT t.task_id)
//         FROM intern_tasks t
//         WHERE t.eti_id = ia.eti_id
//           AND YEARWEEK(t.created_at, 1) = YEARWEEK(att.created_at, 1)
//       ) AS total_tasks,

//       (
//         SELECT COUNT(DISTINCT t.task_id)
//         FROM intern_tasks t
//         WHERE t.eti_id = ia.eti_id
//           AND t.task_status = 'Completed'
//           AND YEARWEEK(t.created_at, 1) = YEARWEEK(att.created_at, 1)
//       ) AS completed_tasks,

//       -- Project tasks for the same week
//       (
//         SELECT COUNT(DISTINCT pt.task_id)
//         FROM project_tasks pt
//         WHERE pt.eti_id = ia.eti_id
//           AND YEARWEEK(pt.created_at, 1) = YEARWEEK(att.created_at, 1)
//       ) AS total_project_tasks,

//       (
//         SELECT COUNT(DISTINCT pt.task_id)
//         FROM project_tasks pt
//         WHERE pt.eti_id = ia.eti_id
//           AND pt.task_status = 'Completed'
//           AND YEARWEEK(pt.created_at, 1) = YEARWEEK(att.created_at, 1)
//       ) AS completed_project_tasks

//     FROM intern_accounts ia
//     LEFT JOIN intern_attendance att ON att.eti_id = ia.eti_id
//     WHERE ia.eti_id = ?
//     GROUP BY YEARWEEK(att.created_at, 1)
//     ORDER BY week_start ASC
//   `;

//   connection.query(sql, [eti_id], (err, result) => {
//     if (err) {
//       console.error("Error generating intern weekly report:", err);
//       return res.status(500).json({ error: "Failed to generate report" });
//     }

//     res.json(result);
//   });
// };


// const GetInternWeeklyReport = (req, res) => {
//   const { eti_id } = req.params;

//   const sql = `
//     SELECT
//       ia.eti_id,
//       STR_TO_DATE(CONCAT(YEARWEEK(att.created_at, 1), ' Monday'), '%X%V %W') AS week_start,
//       DATE_ADD(STR_TO_DATE(CONCAT(YEARWEEK(att.created_at, 1), ' Monday'), '%X%V %W'), INTERVAL 6 DAY) AS week_end,

//       COUNT(DISTINCT CASE WHEN att.status = 1 THEN att.id END) AS attendance_days,

//       COUNT(DISTINCT t.task_id) AS total_tasks,
//       COUNT(DISTINCT CASE WHEN t.task_status = 'Completed' THEN t.task_id END) AS completed_tasks,

//       COUNT(DISTINCT pt.task_id) AS total_project_tasks,
//       COUNT(DISTINCT CASE WHEN pt.task_status = 'Completed' THEN pt.task_id END) AS completed_project_tasks

//     FROM intern_accounts ia

//     LEFT JOIN intern_attendance att 
//       ON att.eti_id = ia.eti_id

//     LEFT JOIN intern_tasks t 
//       ON t.eti_id = ia.eti_id 
//       AND YEARWEEK(t.created_at, 1) = YEARWEEK(att.created_at, 1)

//     LEFT JOIN project_tasks pt 
//       ON pt.eti_id = ia.eti_id 
//       AND YEARWEEK(pt.created_at, 1) = YEARWEEK(att.created_at, 1)

//     WHERE ia.eti_id = ?

//     GROUP BY YEARWEEK(att.created_at, 1)
//     ORDER BY week_start ASC;
//   `;

//   connection.query(sql, [eti_id], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(result);
//   });
// };













const GetInternFullReport = (req, res) => {
  const { eti_id } = req.params;

  // 1. Get static intern info
  const infoSql = `
    SELECT it.name, it.email, it.city, it.phone, it.cnic, it.gender, it.image, it.join_date, it.duration, it.technology, it.intern_type, it.country, it.university
    FROM intern_table it
    WHERE it.id = (SELECT int_id FROM intern_accounts WHERE eti_id = ? LIMIT 1)
    LIMIT 1
  `;

  // 2. Get project summary
  const projectsSql = `
    SELECT COUNT(*) as total_projects,
           SUM(CASE WHEN pstatus='Ongoing' THEN 1 ELSE 0 END) as ongoing,
           SUM(CASE WHEN pstatus='Completed' THEN 1 ELSE 0 END) as completed,
           GROUP_CONCAT(title SEPARATOR ', ') as project_titles
    FROM intern_projects
    WHERE eti_id = ?
  `;

  // 3. Get leaves
  const leavesSql = `
    SELECT COUNT(*) as total_leaves
    FROM intern_leaves
    WHERE eti_id = ? AND leave_status = 1
  `;

  // 4. Get complaints
  const complaintsSql = `
    SELECT COUNT(*) as total_complaints
    FROM manager_complaints
    WHERE eti_id = (SELECT int_id FROM intern_accounts WHERE eti_id = ? LIMIT 1)
  `;

  // 5. Get remaining amount
  const amountSql = `
    SELECT remaining_amount
    FROM intern_remaining_amounts
    WHERE email = (SELECT email FROM intern_accounts WHERE eti_id = ? LIMIT 1)
    LIMIT 1
  `;

  // 6. Get weekly report 
  const weeklySql = ` SELECT
      ia.eti_id,
      STR_TO_DATE(CONCAT(YEARWEEK(att.created_at, 1), ' Monday'), '%X%V %W') AS week_start,
      DATE_ADD(STR_TO_DATE(CONCAT(YEARWEEK(att.created_at, 1), ' Monday'), '%X%V %W'), INTERVAL 6 DAY) AS week_end,

      COUNT(DISTINCT CASE WHEN att.status = 1 THEN att.id END) AS attendance_days,

      COUNT(DISTINCT t.task_id) AS total_tasks,
      COUNT(DISTINCT CASE WHEN t.task_status = 'Completed' THEN t.task_id END) AS completed_tasks,

      COUNT(DISTINCT pt.task_id) AS total_project_tasks,
      COUNT(DISTINCT CASE WHEN pt.task_status = 'Completed' THEN pt.task_id END) AS completed_project_tasks

    FROM intern_accounts ia

    LEFT JOIN intern_attendance att 
      ON att.eti_id = ia.eti_id

    LEFT JOIN intern_tasks t 
      ON t.eti_id = ia.eti_id 
      AND YEARWEEK(t.created_at, 1) = YEARWEEK(att.created_at, 1)

    LEFT JOIN project_tasks pt 
      ON pt.eti_id = ia.eti_id 
      AND YEARWEEK(pt.created_at, 1) = YEARWEEK(att.created_at, 1)

    WHERE ia.eti_id = ?

    GROUP BY YEARWEEK(att.created_at, 1)
    ORDER BY week_start ASC;`;

  // Now, run all queries in parallel and combine results
  connection.query(infoSql, [eti_id], (err, infoRows) => {
    if (err) return res.status(500).json({ error: err });
    const info = infoRows[0] || {};

    connection.query(projectsSql, [eti_id], (err, projRows) => {
      if (err) return res.status(500).json({ error: err });
      const projects = projRows[0] || {};

      connection.query(leavesSql, [eti_id], (err, leaveRows) => {
        if (err) return res.status(500).json({ error: err });
        const leaves = leaveRows[0] || {};

        connection.query(complaintsSql, [eti_id], (err, compRows) => {
          if (err) return res.status(500).json({ error: err });
          const complaints = compRows[0] || {};

          connection.query(amountSql, [eti_id], (err, amtRows) => {
            if (err) return res.status(500).json({ error: err });
            const amount = amtRows[0] || {};

            connection.query(weeklySql, [eti_id], (err, weeklyRows) => {
              if (err) return res.status(500).json({ error: err });
              res.json({
                info,
                projects,
                leaves,
                complaints,
                amount,
                weekly: weeklyRows
              });
            });
          });
        });
      });
    });
  });
};





module.exports = {
  CountProjects,
  CountInPorgressProjects,
  CountCompletedProjects,
  CountAttendance,
  CountHolidays,
  CountLeaves,
  CountTasksInProgress,
  CountTasksComplete,
  CountTotalTasks,
  GetInternAverage,
  GetTopInternByAverage,
  GetInternFullReport
};
