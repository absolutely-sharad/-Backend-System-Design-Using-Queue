const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const authMiddleware = require('../middleware/authMiddleware');

// POST /auth/register - Register a new user
router.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await authService.registerUser(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /auth/login - User login
router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// GET /auth/logout - User logout
router.get('/auth/logout', authMiddleware.authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;