// src/services/workerService.js

const redisClient = require('../config/redis'); // Assuming you have Redis configured
const Request = require('../models/requestModel'); // Assuming you have a Mongoose model for requests

// Function to process a single request from the queue
async function processRequest(queueName) {
    try {
        // Fetch request from Redis queue
        const requestData = await redisClient.lpop(queueName);

        if (!requestData) {
            console.log(`No more requests in the queue ${queueName}`);
            return;
        }

        // Parse request data
        const request = JSON.parse(requestData);

        // Perform the actual processing of the request
        // For example, you might execute a specific task based on the request data
        console.log(`Processing request: ${request}`);

        // Save request to MongoDB for logging or further processing
        await saveRequestToDatabase(request);

        // Continue processing next request
        await processRequest(queueName);
    } catch (error) {
        console.error('Error processing request:', error);
        // Handle error appropriately, such as logging or retrying
    }
}

// Function to save request to MongoDB for logging
async function saveRequestToDatabase(requestData) {
    try {
        const request = new Request(requestData);
        await request.save();
        console.log('Request saved to database:', requestData);
    } catch (error) {
        console.error('Error saving request to database:', error);
        // Handle error appropriately
    }
}

module.exports = {
    processRequest
};