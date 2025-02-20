const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/enqueue', authMiddleware.authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const requestData = req.body;
        const success = await queueController.enqueueRequest(userId, requestData);

        if (success) {
            res.status(200).json({ message: 'Request enqueued successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to enqueue request.' });
        }
    } catch (error) {
        console.error('Error enqueueing request:', error);
        res.status(500).json({ error: 'Failed to enqueue request.' });
    }
});

router.post('/dequeue', authMiddleware.authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const dequeuedRequest = await queueController.dequeueRequest(userId);

        res.status(200).json({ request: dequeuedRequest });
    } catch (error) {
        console.error('Error dequeuing request:', error);
        res.status(500).json({ error: 'Failed to dequeue request.' });
    }
});

module.exports = router;