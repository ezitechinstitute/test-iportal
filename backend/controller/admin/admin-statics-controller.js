const { connection } = require("../../config/connection");

/* Manager Statistics */
const AdminInterviewCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as interviewCount FROM `intern_table` WHERE `status` = 'Interview'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].interviewCount);
  });
};

const AdminContactCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as contactCount FROM `intern_table` WHERE `status` = 'Contact'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].contactCount);
  });
};

const AdminTestCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as testCount FROM `intern_table` WHERE `status` = 'Test'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].testCount);
  });
};

const AdminTestCompletedCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as testCompletedCount FROM `intern_table` WHERE `status` = 'Completed'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].testCompletedCount);
  });
};

/* Intern Statistics */
const AdminCountAllInterns = (req, res) => {
  const sql = "SELECT COUNT(*) as allInterns FROM `intern_table`";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].allInterns);
  });
};

const AdminCountAllActive = (req, res) => {
  const sql =
    "SELECT COUNT(*) as activeInterns FROM `intern_table` WHERE `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].activeInterns);
  });
};

const AdminCountAllProjects = (req, res) => {
  const sql = "SELECT COUNT(*) as allProjects FROM `intern_projects`";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].allProjects);
  });
};

const AdminCountAllTasks = (req, res) => {
  const sql = "SELECT COUNT(*) as allTasks FROM `intern_tasks`";
  connection.query(sql, (err, data) => {
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

const CountSubmittedProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as submitProjects FROM `intern_projects` JOIN project_tasks ON intern_projects.project_id = project_tasks.project_id WHERE project_tasks.task_status = 'Submitted'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].submitProjects);
  });
};

const CountCompletedProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as completedProjects FROM `intern_projects` WHERE `pstatus` = 'Completed'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].completedProjects);
  });
};

const CountExpiredProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as expiredProjects FROM `intern_projects` WHERE `pstatus` = 'Expired'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].expiredProjects);
  });
};

// Manager and Supervisor Activities


const GetManagerActivities = (req, res) => {
  const sql = `
    SELECT 
      m.manager_id,
      m.name AS manager_name,
      COUNT(DISTINCT CASE WHEN it.status = 'Interview' THEN it.id END) AS interviews,
      COUNT(DISTINCT CASE WHEN it.status = 'Contact' THEN it.id END) AS contacts,
      COUNT(DISTINCT CASE WHEN it.status = 'Test' THEN it.id END) AS tests,
      COUNT(DISTINCT t.task_id) AS total_tasks_assigned,
      COUNT(DISTINCT CASE WHEN t.task_status = 'Completed' THEN t.task_id END) AS completed_tasks,
      COUNT(DISTINCT p.project_id) AS projects_supervised,
      COUNT(DISTINCT c.id) AS total_complaints,
      GROUP_CONCAT(DISTINCT tech.technology SEPARATOR ', ') AS technologies_assigned
    FROM manager_accounts m
    LEFT JOIN intern_tasks t ON t.assigned_by = m.manager_id
    LEFT JOIN intern_accounts ia ON ia.eti_id = t.eti_id
    LEFT JOIN intern_table it ON it.email = ia.email
    LEFT JOIN intern_projects p ON p.assigned_by = m.manager_id
    LEFT JOIN manager_complaints c ON c.eti_id = ia.int_id
    LEFT JOIN manager_permissions mp ON mp.manager_id = m.manager_id
    LEFT JOIN technologies tech ON tech.tech_id = mp.tech_id
    WHERE m.loginas = 'Manager'
    GROUP BY m.manager_id, m.name
    ORDER BY interviews DESC;
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const GetSupervisorActivities = (req, res) => {
  const sql = `
    SELECT 
      m.manager_id AS supervisor_id,
      m.name AS supervisor_name,
      COUNT(DISTINCT CASE WHEN it.status = 'Interview' THEN it.id END) AS interviews,
      COUNT(DISTINCT CASE WHEN it.status = 'Contact' THEN it.id END) AS contacts,
      COUNT(DISTINCT CASE WHEN it.status = 'Test' THEN it.id END) AS tests,
      COUNT(DISTINCT t.task_id) AS total_tasks_assigned,
      COUNT(DISTINCT CASE WHEN t.task_status = 'Completed' THEN t.task_id END) AS completed_tasks,
      COUNT(DISTINCT p.project_id) AS projects_supervised,
      COUNT(DISTINCT c.id) AS total_complaints,
      GROUP_CONCAT(DISTINCT tech.technology SEPARATOR ', ') AS technologies_assigned
    FROM manager_accounts m
    LEFT JOIN intern_tasks t ON t.assigned_by = m.manager_id
    LEFT JOIN intern_accounts ia ON ia.eti_id = t.eti_id
    LEFT JOIN intern_table it ON it.email = ia.email
    LEFT JOIN intern_projects p ON p.assigned_by = m.manager_id
    LEFT JOIN manager_complaints c ON c.eti_id = ia.int_id
    LEFT JOIN manager_permissions mp ON mp.manager_id = m.manager_id
    LEFT JOIN technologies tech ON tech.tech_id = mp.tech_id
    WHERE m.loginas = 'Supervisor'
    GROUP BY m.manager_id, m.name
    ORDER BY interviews DESC;
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Student Tracking
const GetStudentTracking = (req, res) => {
  const sql = `
    SELECT 
      ia.eti_id AS intern_eti_id,
      ia.name AS intern_name,
      COUNT(t.task_id) AS total_tasks,
      COUNT(CASE WHEN t.task_status = 'Completed' THEN 1 END) AS completed_tasks,
      COUNT(CASE WHEN t.task_status = 'In Progress' THEN 1 END) AS in_progress_tasks,
      GROUP_CONCAT(DISTINCT m.name SEPARATOR ', ') AS supervisors
      FROM intern_accounts ia
      LEFT JOIN intern_tasks t ON t.eti_id = ia.eti_id
      LEFT JOIN manager_accounts m ON t.assigned_by = m.manager_id
      GROUP BY ia.eti_id, ia.name
      ORDER BY completed_tasks DESC
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Inactivity/Alerts
const GetInactivityAlerts = (req, res) => {
  const sql = `
    SELECT 
      ia.eti_id AS intern_id,
      it.name AS intern_name,
      it.email AS intern_email,
      it.city,
      it.country,
      it.phone,
      it.intern_type,
      ia.int_status,
      ia.int_technology AS technology,
      MAX(CASE WHEN att.status=1 THEN att.updated_at END) AS last_present_date,
      DATEDIFF(CURDATE(), MAX(CASE WHEN att.status=1 THEN att.updated_at END)) AS days_inactive,
      (
        SELECT COUNT(*) FROM intern_attendance a2
        WHERE a2.eti_id = ia.eti_id AND a2.status = 0 AND a2.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ) AS absents_30d,
      (
        SELECT COUNT(*) FROM intern_leaves l
        WHERE l.eti_id = ia.eti_id AND l.leave_status = 1 AND l.from_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ) AS leaves_30d,
      (
        SELECT GROUP_CONCAT(DISTINCT p.title SEPARATOR ', ')
        FROM intern_projects p WHERE p.eti_id = ia.eti_id
      ) AS projects,
      GROUP_CONCAT(DISTINCT m.name ORDER BY m.name SEPARATOR ', ') AS responsible_managers,
      GROUP_CONCAT(DISTINCT m.email ORDER BY m.email SEPARATOR ', ') AS manager_emails
    FROM 
      intern_accounts ia
    LEFT JOIN intern_table it ON it.email = ia.email
    LEFT JOIN intern_attendance att ON att.eti_id = ia.eti_id
    LEFT JOIN intern_tasks t ON t.eti_id = ia.eti_id
    LEFT JOIN manager_accounts m ON m.manager_id = t.assigned_by
    WHERE ia.int_status != 'Completed'
    GROUP BY ia.eti_id, it.name, it.email, it.city, it.country, it.phone, it.intern_type, ia.int_status, ia.int_technology
    HAVING last_present_date IS NULL OR days_inactive > 5
    ORDER BY days_inactive DESC;

  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};




// Intern Status Distribution
const GetInternStatusDistribution = (req, res) => {
  const sql = `
    SELECT status, COUNT(*) as count
    FROM intern_table
    GROUP BY status
    ORDER BY count DESC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};


const GetInternTechnologyBreakdown = (req, res) => {
  const sql = `
    SELECT technology, COUNT(*) as count
    FROM intern_table
    GROUP BY technology
    ORDER BY count DESC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

const GetFinancialOverview = (req, res) => {
  // Use invoices table for received/pending/remaining
  const sql = `
    SELECT 
      IFNULL(SUM(received_amount),0) as received,
      IFNULL(SUM(remaining_amount),0) as remaining,
      IFNULL(SUM(total_amount) - SUM(received_amount),0) as pending
    FROM invoices
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows[0]);
  });
};


// Intern Intake Over Time
const GetInternIntakeOverTime = (req, res) => {
  // Show last 12 months
  const sql = `
    SELECT 
      DATE_FORMAT(join_date, '%Y-%m') as month,
      COUNT(*) as count
    FROM intern_table
    WHERE join_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY month
    ORDER BY month ASC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};


// Revenue & Payment Trends (monthly)
const GetRevenueTrends = (req, res) => {
  const sql = `
    SELECT 
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      SUM(received_amount) AS received,
      SUM(remaining_amount) AS remaining,
      SUM(total_amount) AS total
    FROM invoices
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY month
    ORDER BY month ASC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    // Calculate pending as total - received
    const result = rows.map(row => ({
      ...row,
      pending: row.total - row.received
    }));
    res.json(result);
  });
};

// 2. Intern Conversion Funnel
const GetInternFunnel = (req, res) => {
  const sql = `
    SELECT status, COUNT(*) as count
    FROM intern_table
    WHERE status IN ('Interview','Contact','Test','Active','Completed')
    GROUP BY status
    ORDER BY FIELD(status, 'Interview','Contact','Test','Active','Completed')
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

// Intern Retention Rate (monthly)
const GetRetentionRate = (req, res) => {
  const sql = `
    SELECT 
      DATE_FORMAT(join_date, '%Y-%m') AS month,
      COUNT(*) AS started,
      SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END) AS completed
    FROM intern_table
    WHERE join_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY month
    ORDER BY month ASC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    // Calculate retention rate
    const result = rows.map(row => ({
      ...row,
      retention: row.started > 0 ? Math.round((row.completed / row.started) * 100) : 0
    }));
    res.json(result);
  });
};

// Complaints & Feedback Analysis
const GetComplaintsFeedback = (req, res) => {
  const sql = `
    SELECT status, COUNT(*) as count FROM manager_complaints GROUP BY status
    UNION ALL
    SELECT status, COUNT(*) as count FROM supervisor_complaints GROUP BY status
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    // Group by status for both tables
    const summary = {};
    rows.forEach(row => {
      summary[row.status] = (summary[row.status] || 0) + row.count;
    });
    res.json(summary);
  });
};

// Manager/Department Performance
const GetManagerPerformance = (req, res) => {
  const sql = `
    SELECT 
      m.manager_id,
      m.name AS manager_name,
      COUNT(DISTINCT t.task_id) AS total_tasks,
      COUNT(DISTINCT CASE WHEN t.task_status = 'Completed' THEN t.task_id END) AS completed_tasks,
      COUNT(DISTINCT p.project_id) AS projects_supervised,
      COUNT(DISTINCT c.id) AS complaints
    FROM manager_accounts m
    LEFT JOIN intern_tasks t ON t.assigned_by = m.manager_id
    LEFT JOIN intern_projects p ON p.assigned_by = m.manager_id
    LEFT JOIN manager_complaints c ON c.eti_id IN (
      SELECT int_id FROM intern_accounts WHERE eti_id IN (
        SELECT eti_id FROM intern_tasks WHERE assigned_by = m.manager_id
      )
    )
    GROUP BY m.manager_id, m.name
    ORDER BY total_tasks DESC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

// Intern Attendance Heatmap (daily present/absent counts)
const GetAttendanceHeatmap = (req, res) => {
  const sql = `
    SELECT 
      DATE(created_at) as date,
      SUM(CASE WHEN status=1 THEN 1 ELSE 0 END) as present,
      SUM(CASE WHEN status=0 THEN 1 ELSE 0 END) as absent
    FROM intern_attendance
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY date
    ORDER BY date ASC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

// Interns by University
const GetInternsByUniversity = (req, res) => {
  const sql = `
    SELECT university, COUNT(*) as count
    FROM intern_table
    GROUP BY university
    ORDER BY count DESC
  `;
  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};



module.exports = {
  AdminInterviewCount,
  AdminContactCount,
  AdminTestCount,
  AdminTestCompletedCount,
  AdminCountAllInterns,
  AdminCountAllActive,
  AdminCountAllProjects,
  AdminCountAllTasks,
  CountOngoingProj,
  CountSubmittedProj,
  CountCompletedProj,
  CountExpiredProj,
  GetManagerActivities,
  GetSupervisorActivities,
  GetStudentTracking,
  GetInactivityAlerts,
  GetInternStatusDistribution,
  GetInternTechnologyBreakdown,
  GetFinancialOverview,
  GetInternIntakeOverTime,
  GetRevenueTrends,
  GetInternFunnel,
  GetRetentionRate,
  GetComplaintsFeedback,
  GetManagerPerformance,
  GetAttendanceHeatmap,
  GetInternsByUniversity,
};
