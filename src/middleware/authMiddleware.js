// src/middleware/authMiddleware.js

// Import required modules
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../utils/errorHandler');
const { User } = require('../models/userModel');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming the token is passed as 'Bearer TOKEN'
  
    if (!token) return res.status(401).json({ message: 'Access Denied' });
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };// Export middleware function
  const authenticateUser = (req, res, next) => {
    // Example authentication logic
    if (req.headers.authorization) {
        // Assuming a successful authentication
        req.user = { id: 'user123' }; // Mock user ID for example
        return next();
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { authenticateToken,authenticateUser };