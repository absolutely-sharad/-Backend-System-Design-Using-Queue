// src/utils/validator.js

const { body, validationResult } = require('express-validator');

/**
 * Validation rules for user registration.
 * @returns {Array} Array of validation middleware functions.
 */
const registrationValidationRules = () => {
  return [
    // Validate email
    body('email')
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(), // Normalize email address

    // Validate password
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  ];
};

/**
 * Validation rules for user login.
 * @returns {Array} Array of validation middleware functions.
 */
const loginValidationRules = () => {
  return [
    // Validate email
    body('email')
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(), // Normalize email address

    // Validate password
    body('password')
      .notEmpty().withMessage('Please provide your password')
  ];
};

/**
 * Middleware to handle validation errors.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 * @returns {Object} Response object with error messages if validation fails.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  registrationValidationRules,
  loginValidationRules,
  validate
};