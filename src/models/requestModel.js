const mongoose = require('mongoose');

// Define the schema for the request model
const requestSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for client information
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'], // Status of the request
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Create the Request model
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;