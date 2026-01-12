const db = require('../db/connection');

// Create Icon
const createIcon = async (req, res) => {
  try {
    const { user_id, icon_name, icon_class, color, size, style } = req.body;
    const [result] = await db.query(
      'INSERT INTO icons (user_id, icon_name, icon_class, color, size, style) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, icon_name, icon_class, color || '#000000', size || 'medium', style || 'solid']
    );
    res.status(201).json({ 
      id: result.insertId, 
      user_id,
      icon_name,
      icon_class,
      color,
      size,
      style,
      message: 'Icon created successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Icon by ID
const getIconById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM icons WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Icon not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Icons by User ID
const getIconsByUserId = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM icons WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Icon
const updateIcon = async (req, res) => {
  try {
    const { icon_name, icon_class, color, size, style } = req.body;
    const [result] = await db.query(
      'UPDATE icons SET icon_name = ?, icon_class = ?, color = ?, size = ?, style = ? WHERE id = ?',
      [icon_name, icon_class, color, size, style, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Icon not found' });
    }
    res.json({ message: 'Icon updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Icon
const deleteIcon = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM icons WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Icon not found' });
    }
    res.json({ message: 'Icon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIcon,
  getIconById,
  getIconsByUserId,
  updateIcon,
  deleteIcon
};
