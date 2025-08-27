
const { connection } = require('../../config/connection');
const nodemailer = require('nodemailer');

// Get affiliate stats
// const getAffiliateStats = (req, res) => {
//   const affiliateId = req.user.id;
//   const sql = `
//     SELECT 
//       COUNT(*) AS total_referrals,
//       SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_interns,
//       SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_interns
//     FROM intern_table
//     WHERE referred_by = ?
//   `;
//   connection.query(sql, [affiliateId], (err, result) => {
//     if (err) return res.status(500).json({ error: 'Failed to get stats', details: err });
//     return res.json(result[0]);
//   });
// };


// Generate referral link
const generateReferralLink = async (req, res) => {
  try {
    const affiliate = req.user;

    if (!affiliate || !affiliate.id) {
      return res.status(400).json({
        success: false,
        message: "Affiliate data not found"
      });
    }


    const sql = 'SELECT referral_code FROM affiliates WHERE id = ? AND status = "active"';
    connection.query(sql, [affiliate.id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Referral code not found"
        });
      }

      const referralCode = results[0].referral_code;
      const baseUrl = process.env.BASE_URL || 'https://ezitech.org';
      const referralLink = `${baseUrl}/intern-register?ref=${referralCode}`;

      res.status(200).json({
        success: true,
        referralLink: referralLink,
        referralCode: referralCode
      });
    });

  } catch (error) {
    console.error('Error generating referral link:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};



// Get interns
const getReferredInterns = (req, res) => {
  const referralCode = req.user.referral_code;
  const sql = `
    SELECT name, email, referred_by, join_date AS joinDate, status, technology 
    FROM intern_table 
    WHERE referred_by = ? 
    ORDER BY join_date DESC
  `;
  connection.query(sql, [referralCode], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get interns', details: err });

    return res.json({ results });
  });
};

// Get withdraw requests for logged-in user
const getWithdrawRequests = (req, res) => {
  const eti_id = req.user.referral_code;

  const sql = `
    SELECT 
      req_id, bank, ac_no, ac_name, description, amount, date, req_status 
    FROM withdraw_requests 
    WHERE eti_id = ? 
    ORDER BY created_at DESC
  `;

  connection.query(sql, [eti_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get withdraw requests", details: err });
    }

    return res.json({ results });
  });
};

// Get recent referred interns
const getRecentReferredInterns = (req, res) => {
  const referralCode = req.user.referral_code;
  const sql = `
    SELECT id, name, email, referred_by, join_date AS date, status 
    FROM intern_table 
    WHERE referred_by = ? 
    ORDER BY join_date DESC 
    LIMIT 3
  `;
  connection.query(sql, [referralCode], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get interns', details: err });

    return res.json({ results });
  });
};

// Get earnings history
const getEarningsHistory = (req, res) => {
  const affiliateId = req.user.referral_code;
  const sql = `
  SELECT 
    SUM(total_earnings) AS totalEarnings,
    (
      SELECT COALESCE(SUM(amount), 0)
      FROM withdraw_requests
      WHERE eti_id = ae.affiliate_id
      AND req_status = 'approved'
    ) AS withdrawn,

    SUM(pending_amount) AS pendingPayouts,

    (
      SELECT COALESCE(COUNT(*), 0)
      FROM withdraw_requests
      WHERE eti_id = ae.affiliate_id
      AND req_status = 'approved'
    ) AS successfulPayouts
   

  FROM affiliate_earnings ae
  WHERE affiliate_id = ?
`;

  connection.query(sql, [affiliateId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: "Server error", error: err });
    }
    res.json(results[0]);
  });

};

// Submit withdraw request
const submitWithdrawRequest = (req, res) => {
  const { bank, ac_no, ac_name, description, amount } = req.body;
  const userEmail = req.user?.email;

  if (!userEmail || !bank || !ac_no || !ac_name || !amount) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  const getUserQuery = `SELECT referral_code AS eti_id, email FROM affiliates WHERE email = ?`;

  connection.query(getUserQuery, [userEmail], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const { eti_id, email: req_by } = results[0];

    const getEarningsQuery = `
      SELECT id, total_earnings, pending_amount
      FROM affiliate_earnings
      WHERE affiliate_id = ?
      ORDER BY transaction_date ASC
    `;

    connection.query(getEarningsQuery, [eti_id], (err, rows) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch earnings' });

      const totalAvailable = rows.reduce((sum, row) => sum + parseFloat(row.total_earnings), 0);

      if (totalAvailable < amount) {
        return res.status(400).json({ message: 'Insufficient balance for withdrawal' });
      }

      // Begin transaction
      connection.beginTransaction(err => {
        if (err) return res.status(500).json({ message: 'Transaction error' });

        // Step 1: Insert withdraw request
        const insertWithdraw = `
          INSERT INTO withdraw_requests (eti_id, req_by, bank, ac_no, ac_name, description, amount, req_status)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
        `;

        connection.query(
          insertWithdraw,
          [eti_id, req_by, bank, ac_no, ac_name, description, amount],
          (err, result) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ message: 'Failed to submit withdrawal request' });
              });
            }

            // Step 2: Deduct amount from earnings rows one by one
            let remaining = amount;
            const updateQueries = [];

            for (const row of rows) {
              if (remaining <= 0) break;

              const deduct = Math.min(row.total_earnings, remaining);
              remaining -= deduct;

              updateQueries.push(
                new Promise((resolve, reject) => {
                  const update = `
                    UPDATE affiliate_earnings
                    SET total_earnings = total_earnings - ?, pending_amount = pending_amount + ?
                    WHERE id = ?
                  `;
                  connection.query(update, [deduct, deduct, row.id], (err) => {
                    if (err) return reject(err);
                    resolve();
                  });
                })
              );
            }

            // Step 3: Run all update queries
            Promise.all(updateQueries)
              .then(() => {
                connection.commit(err => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json({ message: 'Commit error' });
                    });
                  }

                  res.status(201).json({
                    message: 'Withdraw request submitted successfully',
                    withdrawId: result.insertId
                  });
                });
              })
              .catch(err => {
                connection.rollback(() => {
                  res.status(500).json({ message: 'Failed to update earnings rows' });
                });
              });
          }
        );
      });
    });
  });
};





// Get dashboard stats
const getDashboardStats = (req, res) => {
  const referralCode = req.user.referral_code;
  // const referral_id = req.user.id;
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const statsQuery = `
    SELECT 
      COUNT(*) AS totalReferrals,
      COALESCE(SUM(CASE WHEN status = 'ongoing' THEN 1 ELSE 0 END),0) AS activeInterns
    FROM intern_table
    WHERE referred_by = ?
  `;

  const earningsQuery = `
    SELECT 
    COALESCE(SUM(total_earnings),0) AS totalEarnings,
    COALESCE(SUM(pending_amount),0) AS pendingAmount
  FROM  affiliate_earnings
  WHERE affiliate_id = ?
  `;

  const chartQuery = `
    SELECT 
      MONTH(created_at) AS month, 
      YEAR(created_at) AS year, 
      COUNT(*) AS count
    FROM intern_table
    WHERE referred_by = ? AND created_at >= ?
    GROUP BY year, month
    ORDER BY year ASC, month ASC
  `;

  connection.query(statsQuery, [referralCode], (err, statsResults) => {
    if (err) return res.status(500).json({ error: 'Stats query failed', details: err });

    connection.query(earningsQuery, [referralCode], (err, earningsResults) => {
      if (err) return res.status(500).json({ error: 'Earnings query failed', details: err });

      connection.query(chartQuery, [referralCode, sixMonthsAgo], (err, chartResults) => {
        if (err) return res.status(500).json({ error: 'Chart query failed', details: err });

        const labels = [];
        const data = [];
        chartResults.forEach(item => {
          labels.push(`${item.month}/${item.year}`);
          data.push(item.count);
        });

        const stats = statsResults[0] || { totalReferrals: 0, activeInterns: 0 };
        const earnings = earningsResults[0] || { totalEarnings: 0, pendingAmount: 0 };

        return res.json({
          stats: {
            totalReferrals: stats.totalReferrals,
            activeInterns: stats.activeInterns,
            totalEarnings: earnings.totalEarnings,
            pendingAmount: earnings.pendingAmount
          },
          chart: {
            labels,
            data
          }
        });
      });
    });
  });
};




//  transporter for (Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// testing 
// transporter.verify()
//   .then(() => console.log(' Mail transporter ready'))
//   .catch(err => console.error(' Mail transporter error', err));

const sendQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Query from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'Query sent successfully' });

  } catch (err) {
    console.error('Send-query error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = {
  // getAffiliateStats,
  generateReferralLink,
  getReferredInterns,
  getRecentReferredInterns,
  getEarningsHistory,
  getDashboardStats,
  submitWithdrawRequest,
  getWithdrawRequests,
  sendQuery
};
