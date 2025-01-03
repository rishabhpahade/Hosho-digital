const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Get all opportunities for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const [opportunities] = await pool.query('SELECT * FROM Opportunities WHERE user_id = ?', [userId]);
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new opportunity
router.post('/', async (req, res) => {
  const { title, deal_value, status, userId } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Opportunities (title, deal_value, status, user_id) VALUES (?, ?, ?, ?)',
      [title, deal_value, status, userId]
    );
    res.status(201).json({ id: result.insertId, message: 'Opportunity added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an opportunity
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, deal_value, status } = req.body;
  try {
    await pool.query('UPDATE Opportunities SET title = ?, deal_value = ?, status = ? WHERE id = ?', [
      title,
      deal_value,
      status,
      id,
    ]);
    res.json({ message: 'Opportunity updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an opportunity
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Opportunities WHERE id = ?', [id]);
    res.json({ message: 'Opportunity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
