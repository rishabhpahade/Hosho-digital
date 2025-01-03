const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get performance metrics for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const [performance] = await pool.query('SELECT * FROM Performance WHERE user_id = ?', [userId]);
    res.json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add performance targets
router.post('/', async (req, res) => {
  const { userId, targets, achieved, period } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Performance (user_id, targets, achieved, period) VALUES (?, ?, ?, ?)',
      [userId, targets, achieved, period]
    );
    res.status(201).json({ id: result.insertId, message: 'Performance target added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update performance metrics
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { targets, achieved, period } = req.body;
  try {
    await pool.query('UPDATE Performance SET targets = ?, achieved = ?, period = ? WHERE id = ?', [
      targets,
      achieved,
      period,
      id,
    ]);
    res.json({ message: 'Performance updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete performance metrics
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Performance WHERE id = ?', [id]);
    res.json({ message: 'Performance metric deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
