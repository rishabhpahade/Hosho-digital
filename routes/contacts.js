const express = require('express');
const pool = require('../config/db'); // Assuming your database connection pool
const router = express.Router();

// Get Contacts (including most recent)
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    // Optimized query to retrieve most recent contact first
    const [contacts] = await pool.query(
      'SELECT * FROM Contacts WHERE user_id = ? ORDER BY id DESC LIMIT 1',
      [userId]
    );

    // Check if any contacts exist for the user
    if (contacts.length === 0) {
      res.json({ message: 'No recent contacts found' });
    } else {
      res.json(contacts[0]); // Return only the most recent contact
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Contact
router.post('/', async (req, res) => {
  const { name, email, phone, userId } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO Contacts (name, email, phone, user_id) VALUES (?, ?, ?, ?)',
      [name, email, phone, userId]
    );

    // Retrieve the newly added contact (optional)
    const [newContact] = await pool.query(
      'SELECT * FROM Contacts WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Contact added',
      newContact: newContact[0] || null // Include newly added contact if retrieved
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;