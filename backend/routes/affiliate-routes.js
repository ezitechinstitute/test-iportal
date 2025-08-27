const express = require("express");
const router = express.Router();
const { verifyToken, loginLimiter, apiLimiter,upload } = require('../middleware/authMiddleware');

//  affiliate controllers
const {
  loginAffiliate,
  registerAffiliate,
  updateBankInfo,
  getProfile,
  updateProfile,
  deleteAccount
} = require('../controller/affiliate/affiliate-auth-controller');

//  forgot password controllers
const { 
  forgotPassword, 
  resetPassword,
  changePassword
} = require('../controller/affiliate/affiliate-auth-controller');

const {
  generateReferralLink,
  getReferredInterns,
  getRecentReferredInterns,
  getEarningsHistory,
  submitWithdrawRequest,
  getWithdrawRequests,
  getDashboardStats,
  sendQuery
} = require('../controller/affiliate/affiliate-stats-controller');

// Health check route
router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Auth routes
router.post('/register', registerAffiliate);
router.post('/login', loginLimiter, loginAffiliate);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', [verifyToken, apiLimiter], changePassword);
router.get('/profile', [verifyToken, apiLimiter], getProfile);
router.put('/profile', [verifyToken, apiLimiter, upload.single("profile_image")], updateProfile);
router.put('/bank-info', [verifyToken, apiLimiter], updateBankInfo);
router.delete('/delete-account', [verifyToken, apiLimiter], deleteAccount);

// router.get('/stats', [verifyToken, apiLimiter], getAffiliateStats);
router.get('/referral-link', [verifyToken, apiLimiter], generateReferralLink);
router.get('/interns', [verifyToken, apiLimiter], getReferredInterns);
router.get('/recent-interns', [verifyToken, apiLimiter], getRecentReferredInterns);
router.get('/earnings', [verifyToken, apiLimiter], getEarningsHistory);
router.post('/withdraw',[verifyToken, apiLimiter],submitWithdrawRequest  );
router.get('/dashboard', [verifyToken, apiLimiter], getDashboardStats);
router.get('/withdraw-requests', [verifyToken, apiLimiter], getWithdrawRequests);
router.post('/send-query', [verifyToken, apiLimiter], sendQuery);

module.exports = router; 