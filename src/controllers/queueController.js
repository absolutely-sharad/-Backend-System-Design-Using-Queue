const express = require('express');
const router = express.Router();
const { enqueueRequest, dequeueRequest } = require('../services/queueService');
const { validateEnqueueRequest, validateClientId } = require('../utils/validator');

// Route for adding a request to the queue
router.post('/enqueue', async (req, res) => {
    try {
        // Validate request body
        const { error } = validateEnqueueRequest(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extract request data from the request body
        const { clientId, requestData } = req.body;

        // Add request to the queue
        const addedRequest = await queueService.enqueueRequest(clientId, requestData);

        // Respond with success message
        res.status(201).json({ message: 'Request added to the queue successfully', request: addedRequest });
    } catch (err) {
        // Handle errors
        console.error('Error enqueueing request:', err);
        if (err.isClientError) {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for processing a request from the queue
router.post('/dequeue', async (req, res) => {
    try {
        // Validate client ID in request body
        const { error } = validateClientId(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extract client ID from request body
        const { clientId } = req.body;

        // Process request from the queue
        const processedRequest = await queueService.processRequest(clientId);

        if (!processedRequest) {
            return res.status(404).json({ message: 'No requests in the queue for the client' });
        }

        // Respond with processed request data
        res.status(200).json({ message: 'Request processed successfully', request: processedRequest });
    } catch (err) {
        // Handle errors
        console.error('Error processing request:', err);
        if (err.isClientError) {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    enqueueRequest,
    dequeueRequest
};