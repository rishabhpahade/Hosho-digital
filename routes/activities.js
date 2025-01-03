const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all activities for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const [activities] = await pool.query('SELECT * FROM Activities WHERE user_id = ?', [userId]);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Log a new activity
router.post('/', async (req, res) => {
  const { description, activity_date, userId } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Activities (description, activity_date, user_id) VALUES (?, ?, ?)',
      [description, activity_date, userId]
    );
    res.status(201).json({ id: result.insertId, message: 'Activity logged' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Activities WHERE id = ?', [id]);
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
