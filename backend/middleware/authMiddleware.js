const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { connection } = require('../config/connection');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, secretKey);

    const sql = 'SELECT * FROM affiliates WHERE id = ? AND status = "active"';
    connection.query(sql, [decoded.id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid or inactive account' });
      }

      const affiliate = results[0];

      req.user = {
        id: affiliate.id,
        email: affiliate.email,
        referral_code: affiliate.referral_code,
        role: 'affiliate',
      };

      next();
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Dummy limiters (implement if needed)
const loginLimiter = (req, res, next) => next();
const apiLimiter = (req, res, next) => next();

module.exports = {
  verifyToken,
  loginLimiter,
  apiLimiter,
  upload,
};
