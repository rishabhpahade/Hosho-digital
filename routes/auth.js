const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user into the database
    const [result] = await pool.query(
      'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Optional: List all users (for admin purposes)
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, created_at FROM Users');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;
