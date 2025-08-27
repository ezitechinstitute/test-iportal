const { connection } = require("../../config/connection");

// Get interns with review status 'Review'
const GetReviewInterns = (req, res) => {
  // Get pagination parameters from query string
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Get search term if provided
  const searchTerm = req.query.search || '';

  // Base SQL query
  let sql = `
    SELECT it.image, it.name, it.technology, it.email, it.join_date, it.phone, it.intern_type
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Review' AND ia.int_status = 'Active'
  `;

  // Add search filter if search term exists
  if (searchTerm) {
    sql += ` AND it.name LIKE '%${connection.escape(searchTerm).replace(/'/g, '')}%'`;
  }

  // Add pagination
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  // Query for total count (for pagination metadata)
  let countSql = `
    SELECT COUNT(*) as total
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Review' AND ia.int_status = 'Active'
  `;

  if (searchTerm) {
    countSql += ` AND it.name LIKE '%${connection.escape(searchTerm).replace(/'/g, '')}%'`;
  }

  // Execute both queries
  connection.query(countSql, (err, countResult) => {
    if (err) {
      console.error("Count query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Data query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const results = data.map(row => ({
        image: row.image,
        name: row.name,
        technology: row.technology,
        joinDate: row.join_date,
        phone: row.phone,
        internType: row.intern_type,
        email: row.email
      }));

      return res.json({
        data: results,
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

// Get interns with review status 'Non-Review'
const GetNonReviewInterns = (req, res) => {
  // Get pagination parameters from query string
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Get search term if provided
  const searchTerm = req.query.search || '';

  // Base SQL query
  let sql = `
    SELECT it.image, it.name, it.email, it.technology, it.join_date, it.phone, it.intern_type
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Non-Review' AND ia.int_status = 'Active'
  `;

  // Add search filter if search term exists
  if (searchTerm) {
    sql += ` AND it.name LIKE '%${connection.escape(searchTerm).replace(/'/g, '')}%'`;
  }

  // Add pagination
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  // Query for total count (for pagination metadata)
  let countSql = `
    SELECT COUNT(*) as total
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Non-Review' AND ia.int_status = 'Active'
  `;

  if (searchTerm) {
    countSql += ` AND it.name LIKE '%${connection.escape(searchTerm).replace(/'/g, '')}%'`;
  }

  // Execute both queries
  connection.query(countSql, (err, countResult) => {
    if (err) {
      console.error("Count query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Data query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const results = data.map(row => ({
        image: row.image,
        name: row.name,
        technology: row.technology,
        joinDate: row.join_date,
        phone: row.phone,
        internType: row.intern_type,
        email: row.email
      }));

      return res.json({
        data: results,
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
// Count total interns with review status 'Review'
const CountReviewInterns = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalReviewInterns
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Review' AND ia.int_status = 'Active'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const totalReviewInterns = data[0].totalReviewInterns;
    return res.json({ totalReviewInterns });
  });
};

// Count total interns with review status 'Non-Review'
const CountNonReviewInterns = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalNonReviewInterns
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Non-Review' AND ia.int_status = 'Active'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const totalNonReviewInterns = data[0].totalNonReviewInterns;
    return res.json({ totalNonReviewInterns });
  });
};

const UpdateReviewStatus = (req, res) => {
    const { email, reviewStatus } = req.body;
  
    // Log the request body for debugging
    console.log('Request body:', req.body);
  
    if (!email || !reviewStatus) {
      return res.status(400).json({ error: "Email and reviewStatus are required" });
    }
  
    const sql = `
      UPDATE intern_accounts 
      SET review = ?
      WHERE email = ?`;
  
    connection.query(sql, [reviewStatus, email], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Intern not found" });
      }
  
      return res.json({ message: "Review status updated successfully" });
    });
  };
module.exports = {
  GetReviewInterns,
  GetNonReviewInterns,
  CountReviewInterns,
  CountNonReviewInterns,
  UpdateReviewStatus
};