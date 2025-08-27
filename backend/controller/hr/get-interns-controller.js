const { connection } = require("../../config/connection");

const GetActiveInterns = (req, res) => {
  const sql = "SELECT * FROM `intern_accounts` WHERE `int_status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const CountInterns = (req, res) => {
  const sql = `SELECT intern_type, MONTH(created_at) as month, COUNT(*) as count FROM intern_table WHERE YEAR(created_at) = YEAR(CURDATE()) GROUP BY intern_type, MONTH(created_at) ORDER BY MONTH(created_at)`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.json(err);
    } else {
      const data = {
        onsite: Array(12).fill(0),
        remote: Array(12).fill(0),
      };

      results.forEach((row) => {
        if (row.intern_type === "Onsite") {
          data.onsite[row.month - 1] = row.count;
        } else if (row.intern_type === "Remote") {
          data.remote[row.month - 1] = row.count;
        }
      });
      res.json(data);
    }
  });
};

const CountInterviewInterns = (req, res) => {
  const { managerid } = req.params;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT COUNT(*) as count FROM `intern_table` WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Interview"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}'`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
        // console.log(query);

        connection.query(query, (reject, resolve) => {
          if (reject) {
            console.log(reject);
            return res.json(reject);
          } else {
            return res.json(resolve[0]);
          }
        });
      } else {
        return res.json("Something Went Wrong!!!");
      }
    }
  });
};

const CountTestInterns = (req, res) => {
  const { managerid } = req.params;
  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT COUNT(*) as count FROM `intern_table` WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Test"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}'`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
        // console.log(query);

        connection.query(query, (reject, resolve) => {
          if (reject) {
            console.log(reject);
            return res.json(reject);
          } else {
            return res.json(resolve[0]);
          }
        });
      } else {
        return res.json("Something Went Wrong!!!");
      }
    }
  });
};

const CountTestCompleted = (req, res) => {
  const { managerid } = req.params;
  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT COUNT(*) as count FROM `intern_table` WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Completed"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}'`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
        // console.log(query);

        connection.query(query, (reject, resolve) => {
          if (reject) {
            console.log(reject);
            return res.json(reject);
          } else {
            return res.json(resolve[0]);
          }
        });
      } else {
        return res.json("Something Went Wrong!!!");
      }
    }
  });
};

const CountContactWith = (req, res) => {
  const { managerid } = req.params;
  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT COUNT(*) as count FROM `intern_table` WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Contact"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}'`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
        // console.log(query);

        connection.query(query, (reject, resolve) => {
          if (reject) {
            console.log(reject);
            return res.json(reject);
          } else {
            return res.json(resolve[0]);
          }
        });
      } else {
        return res.json("Something Went Wrong!!!");
      }
    }
  });
};

// Get Interns Framework

const GetNewGlobalInternsFrameWork = (req, res) => {
  const { managerid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      let query = "SELECT * FROM intern_table WHERE 1 = 1 AND country != 'Pakistan'";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Interview"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
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

            if (iview_type.length > 0) {
              countquery += ` AND interview_type IN ('${iview_type.join(
                "','"
              )}')`;
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

const GetNewInternsFrameWork = (req, res) => {
  const { managerid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      let query = "SELECT * FROM intern_table WHERE 1 = 1 AND country = 'Pakistan'";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Interview"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
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

            if (iview_type.length > 0) {
              countquery += ` AND interview_type IN ('${iview_type.join(
                "','"
              )}')`;
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

const GetContactInternsFrameWork = (req, res) => {
  const { managerid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT * FROM intern_table WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Contact"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
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

            if (iview_type.length > 0) {
              countquery += ` AND interview_type IN ('${iview_type.join(
                "','"
              )}')`;
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

const GetTestInternsFrameWork = (req, res) => {
  const { managerid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT * FROM intern_table WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Test"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
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

            if (iview_type.length > 0) {
              countquery += ` AND interview_type IN ('${iview_type.join(
                "','"
              )}')`;
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

const GetTestCompleteInternsFrameWork = (req, res) => {
  const { managerid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, manager_permissions.interview_type FROM `intern_table` JOIN manager_permissions ON manager_permissions.interview_type = intern_table.interview_type JOIN technologies ON manager_permissions.tech_id = technologies.tech_id WHERE manager_permissions.manager_id = ?";
  connection.query(sql_0, [managerid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const managerTech = [];
      const managerInterview = [];
      for (let i = 0; i < data.length; i++) {
        managerTech.push(data[i].technology);
        managerInterview.push(data[i].interview_type);
      }

      // console.log(managerTech);
      // console.log(managerInterview);
      // const managerTech = data[]

      let query = "SELECT * FROM intern_table WHERE 1 = 1";
      const techFilter = managerTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iview_type = [...new Set(managerInterview.map((i) => i))];

      if (iview_type.length > 0) {
        query += ` AND interview_type IN ('${iview_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Completed"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (managerTech.length > 0 && managerInterview.length > 0) {
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

            if (iview_type.length > 0) {
              countquery += ` AND interview_type IN ('${iview_type.join(
                "','"
              )}')`;
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

const GetInternStats = (req, res) => {
  const sql = `
    SELECT 
      it.intern_type, 
      MONTH(it.created_at) as month, 
      COUNT(*) as count 
    FROM 
      intern_table it
    INNER JOIN 
      intern_accounts ia 
    ON 
      it.email = ia.email
    WHERE 
      YEAR(it.created_at) = YEAR(CURDATE()) 
      AND ia.int_status = 'Active'
    GROUP BY 
      it.intern_type, MONTH(it.created_at) 
    ORDER BY 
      MONTH(it.created_at);
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database query error", details: err });
    } else {
      // Initialize data for onsite and remote interns
      const data = {
        onsite: Array(12).fill(0),
        remote: Array(12).fill(0),
      };

      // Process the query results
      results.forEach((row) => {
        if (row.intern_type === "Onsite") {
          data.onsite[row.month - 1] = row.count;
        } else if (row.intern_type === "Remote") {
          data.remote[row.month - 1] = row.count;
        }
      });

      // Return the processed data
      return res.status(200).json(data);
    }
  });
};

module.exports = {
  GetNewGlobalInternsFrameWork,
  GetActiveInterns,
  CountInterns,
  CountInterviewInterns,
  CountTestInterns,
  CountTestCompleted,
  CountContactWith,
  GetNewInternsFrameWork,
  GetTestInternsFrameWork,
  GetContactInternsFrameWork,
  GetTestCompleteInternsFrameWork,
  GetInternStats,
};
