const express = require('express');
const router = express.Router();
const {
  trackEvent,
  getAnalyticsByUser,
  getAnalyticsSummary
} = require('../controllers/analyticsController');

router.post('/', trackEvent);
router.get('/user/:userId', getAnalyticsByUser);
router.get('/summary', getAnalyticsSummary);

module.exports = router;
