const { connection } = require("../../config/connection");

const AdminInterviewInt = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 200;
  const offset = (page - 1) * limit;

  const sql =
    "SELECT * FROM `intern_table` WHERE `status` = 'Interview' ORDER BY id DESC LIMIT ? OFFSET ?";

  connection.query(sql, [limit, offset], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const sql =
        "SELECT COUNT(*) as count FROM `intern_table` WHERE `status` = 'Interview'";

      connection.query(sql, (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: data,
          meta: {
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }

    // return res.json(data);
  });
};

const AdminTestInt = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 200;
  const offset = (page - 1) * limit;

  const sql =
    "SELECT * FROM `intern_table` WHERE `status` = 'Test' ORDER BY id DESC LIMIT ? OFFSET ?";

  connection.query(sql, [limit, offset], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const sql =
        "SELECT COUNT(*) as count FROM `intern_table` WHERE `status` = 'Test'";

      connection.query(sql, (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: data,
          meta: {
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }

    // return res.json(data);
  });
};

const AdminTestCompInt = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 200;
  const offset = (page - 1) * limit;

  const sql =
    "SELECT * FROM `intern_table` WHERE `status` = 'Completed' ORDER BY id DESC LIMIT ? OFFSET ?";

  connection.query(sql, [limit, offset], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const sql =
        "SELECT COUNT(*) as count FROM `intern_table` WHERE `status` = 'Completed'";

      connection.query(sql, (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: data,
          meta: {
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }

    // return res.json(data);
  });
};

// const AdminActiveInt = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 200;
//   const offset = (page - 1) * limit;

//   const sql =
//     "SELECT * FROM `intern_table` WHERE `status` = 'Active' ORDER BY id DESC LIMIT ? OFFSET ?";

//   connection.query(sql, [limit, offset], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       const sql =
//         "SELECT COUNT(*) as count FROM `intern_table` WHERE `status` = 'Active'";

//       connection.query(sql, (c_err, c_data) => {
//         const totalData = c_data[0].count;
//         const totalPages = Math.ceil(totalData / limit);

//         return res.json({
//           data: data,
//           meta: {
//             page,
//             limit,
//             totalData,
//             totalPages,
//           },
//         });
//       });
//     }

//     // return res.json(data);
//   });
// };


const AdminActiveInt = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 200;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT 
      it.id,
      it.name,
      it.email,
      it.city,
      it.phone,
      it.cnic,
      it.gender,
      it.image,
      it.join_date,
      it.birth_date,
      it.university,
      it.country,
      it.interview_type,
      it.technology,
      it.duration,
      it.status,
      it.intern_type,
      it.interview_date,
      it.interview_time,
      it.created_at,
      ia.eti_id  -- new field for intern ID to link intern_accounts with intern_table for displaying intern report in the frontend
    FROM intern_table it
    LEFT JOIN intern_accounts ia ON ia.email = it.email
    WHERE it.status = 'Active'
    ORDER BY it.id DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(sql, [limit, offset], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Query Error", details: err });
    } else {
      const countQuery = `
        SELECT COUNT(*) as count 
        FROM intern_table 
        WHERE status = 'Active'
      `;

      connection.query(countQuery, (c_err, c_data) => {
        if (c_err) {
          return res.status(500).json({ error: "Count Error", details: c_err });
        }

        const totalData = c_data[0].count;
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
    }
  });
};


const AdminRemovedInt = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 200;
  const offset = (page - 1) * limit;

  const sql =
    "SELECT * FROM `intern_table` WHERE `status` = 'Removed' ORDER BY id DESC LIMIT ? OFFSET ?";

  connection.query(sql, [limit, offset], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const sql =
        "SELECT COUNT(*) as count FROM `intern_table` WHERE `status` = 'Removed'";

      connection.query(sql, (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: data,
          meta: {
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }

    // return res.json(data);
  });
};

const AdminContactInt = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 200;
  const offset = (page - 1) * limit;

  const sql =
    "SELECT * FROM `intern_table` WHERE `status` = 'Contact' ORDER BY id DESC LIMIT ? OFFSET ?";

  connection.query(sql, [limit, offset], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const sql =
        "SELECT COUNT(*) as count FROM `intern_table` WHERE `status` = 'Contact'";

      connection.query(sql, (c_err, c_data) => {
        const totalData = c_data[0].count;
        const totalPages = Math.ceil(totalData / limit);

        return res.json({
          data: data,
          meta: {
            page,
            limit,
            totalData,
            totalPages,
          },
        });
      });
    }

    // return res.json(data);
  });
};

const UpdateIntern = (req, res) => {
  const { id } = req.params;
  const { email, technology, status } = req.body.editableData;

  const sql =
    "UPDATE `intern_table` SET `email`= ?, `technology`= ?,`status`= ? WHERE `id` = ?";
  connection.query(sql, [email, technology, status, id], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Updated Successfuly" });
  });
};

const AdminActiveInterns = (req, res) => {
  const sql = "SELECT * FROM `intern_accounts`";

  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const UpdateActiveIntern = (req, res) => {
  const { id } = req.params;
  const { email, technology, status } = req.body.editableData;

  const sql =
    "UPDATE `intern_accounts` SET `email`= ?, `int_technology`= ?,`int_status`= ? WHERE `int_id` = ?";
  connection.query(sql, [email, technology, status, id], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Updated Successfuly" });
  });
};

const RemoveInt = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE `intern_table` SET `status`= 'Removed' WHERE `id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Intern Removed Successfuly" });
  });
};

module.exports = {
  AdminInterviewInt,
  AdminContactInt,
  AdminTestInt,
  AdminTestCompInt,
  AdminActiveInt,
  AdminRemovedInt,
  UpdateIntern,
  AdminActiveInterns,
  UpdateActiveIntern,
  RemoveInt,
};
