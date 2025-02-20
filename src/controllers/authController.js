// authController.js

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Middleware for validating login request
const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

// Middleware for validating register request
const validateRegister = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// POST /auth/login
router.post('/login', validateLogin, async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validation errors in login request', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract email and password from request body
        const { email, password } = req.body;

        // Authenticate user
        const token = await authService.login(email, password);

        // Return JWT token on successful authentication
        res.json({ token });
    } catch (err) {
        if (err.isOperational) {
            logger.warn('Operational error during login', { message: err.message });
            return res.status(400).json({ error: err.message });
        }
        logger.error('Server error during login', { message: err.message });
        res.status(500).send('Server Error');
    }
});

// POST /auth/register
router.post('/register', validateRegister, async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validation errors in register request', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract email and password from request body
        const { email, password } = req.body;

        // Register user
        const token = await authService.register(email, password);

        // Return JWT token on successful registration
        res.json({ token });
    } catch (err) {
        if (err.isOperational) {
            logger.warn('Operational error during registration', { message: err.message });
            return res.status(400).json({ error: err.message });
        }
        logger.error('Server error during registration', { message: err.message });
        res.status(500).send('Server Error');
    }
});

module.exports = router;