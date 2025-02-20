// src/utils/logger.js

const fs = require('fs');
const path = require('path');

// Function to create log directory if it doesn't exist
const createLogDirectory = (logDirectory) => {
  if (!fs.existsSync(logDirectory)) {
    try {
      fs.mkdirSync(logDirectory, { recursive: true }); // Create log directory recursively
    } catch (err) {
      console.error('Error creating log directory:', err);
    }
  }
};

// Function to get current timestamp in a readable format
const getCurrentTimestamp = () => {
  const date = new Date();
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())} ${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
};

// Function to pad a number with leading zeros (for date formatting)
const padNumber = (num) => {
  return num.toString().padStart(2, '0');
};

// Logger function to write logs to a file
const logger = (level, message, logFilePath = path.join(__dirname, '../../logs/app.log')) => {
  const timestamp = getCurrentTimestamp();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

  createLogDirectory(path.dirname(logFilePath)); // Ensure log directory exists

  fs.appendFile(logFilePath, logMessage, { flag: 'a+' }, (err) => { // Append to existing file, create if doesn't exist
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

module.exports = logger;