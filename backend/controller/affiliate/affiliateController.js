// const { connection } = require('../../config/connection');

// const GetReviewInterns = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const searchTerm = req.query.search || '';
//   const offset = (page - 1) * limit;

//   const baseQuery = `FROM intern_table WHERE review = 'Review' AND status = 'Active'`;
//   const searchCondition = searchTerm ? ` AND name LIKE ?` : '';
//   const params = searchTerm ? [`%${searchTerm}%`] : [];

//   const countQuery = `SELECT COUNT(*) AS total ${baseQuery}${searchCondition}`;
//   const dataQuery = `SELECT image, name, technology, email, join_date AS joinDate, phone, intern_type AS internType 
//                      ${baseQuery}${searchCondition} LIMIT ? OFFSET ?`;

//   connection.query(countQuery, params, (err, countResult) => {
//     if (err) return res.status(500).json({ error: 'Database query failed', details: err });

//     const total = countResult[0].total;

//     connection.query(dataQuery, [...params, limit, offset], (err, data) => {
//       if (err) return res.status(500).json({ error: 'Database query failed', details: err });

//       return res.json({
//         data,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(total / limit),
//           totalItems: total,
//           itemsPerPage: limit
//         }
//       });
//     });
//   });
// };

// const GetNonReviewInterns = (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const searchTerm = req.query.search || '';
//   const offset = (page - 1) * limit;

//   const baseQuery = `FROM intern_table WHERE review = 'Non-Review' AND status = 'Active'`;
//   const searchCondition = searchTerm ? ` AND name LIKE ?` : '';
//   const params = searchTerm ? [`%${searchTerm}%`] : [];

//   const countQuery = `SELECT COUNT(*) AS total ${baseQuery}${searchCondition}`;
//   const dataQuery = `SELECT image, name, technology, email, join_date AS joinDate, phone, intern_type AS internType 
//                      ${baseQuery}${searchCondition} LIMIT ? OFFSET ?`;

//   connection.query(countQuery, params, (err, countResult) => {
//     if (err) return res.status(500).json({ error: 'Database query failed', details: err });

//     const total = countResult[0].total;

//     connection.query(dataQuery, [...params, limit, offset], (err, data) => {
//       if (err) return res.status(500).json({ error: 'Database query failed', details: err });

//       return res.json({
//         data,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(total / limit),
//           totalItems: total,
//           itemsPerPage: limit
//         }
//       });
//     });
//   });
// };

// const CountReviewInterns = (req, res) => {
//   const sql = `SELECT COUNT(*) AS totalReviewInterns FROM intern_table WHERE review = 'Review' AND status = 'Active'`;
//   connection.query(sql, (err, result) => {
//     if (err) return res.status(500).json({ error: 'Database query failed', details: err });
//     return res.json({ totalReviewInterns: result[0].totalReviewInterns });
//   });
// };

// const CountNonReviewInterns = (req, res) => {
//   const sql = `SELECT COUNT(*) AS totalNonReviewInterns FROM intern_table WHERE review = 'Non-Review' AND status = 'Active'`;
//   connection.query(sql, (err, result) => {
//     if (err) return res.status(500).json({ error: 'Database query failed', details: err });
//     return res.json({ totalNonReviewInterns: result[0].totalNonReviewInterns });
//   });
// };

// const UpdateReviewStatus = (req, res) => {
//   const { email, reviewStatus } = req.body;
//   if (!email || !reviewStatus) {
//     return res.status(400).json({ error: 'Email and reviewStatus are required' });
//   }

//   const sql = `UPDATE intern_table SET review = ? WHERE email = ?`;
//   connection.query(sql, [reviewStatus, email], (err, result) => {
//     if (err) return res.status(500).json({ error: 'Database query failed', details: err });
//     if (result.affectedRows === 0) return res.status(404).json({ error: 'Intern not found' });
//     return res.json({ message: 'Review status updated successfully' });
//   });
// };

// module.exports = {
//   GetReviewInterns,
//   GetNonReviewInterns,
//   CountReviewInterns,
//   CountNonReviewInterns,
//   UpdateReviewStatus
// };
