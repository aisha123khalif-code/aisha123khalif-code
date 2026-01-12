const db = require('../db/connection');

// Track Analytics Event
const trackEvent = async (req, res) => {
  try {
    const { user_id, event_type, event_data } = req.body;
    const [result] = await db.query(
      'INSERT INTO analytics (user_id, event_type, event_data) VALUES (?, ?, ?)',
      [user_id ?? null, event_type, JSON.stringify(event_data ?? {})]
    );
    res.status(201).json({ 
      id: result.insertId,
      message: 'Event tracked successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Analytics by User
const getAnalyticsByUser = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM analytics WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Analytics Summary
const getAnalyticsSummary = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT event_type, COUNT(*) as count FROM analytics GROUP BY event_type ORDER BY count DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  trackEvent,
  getAnalyticsByUser,
  getAnalyticsSummary
};
