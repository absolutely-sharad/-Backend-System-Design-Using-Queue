const redis = require('redis');

// Create a Redis client with default settings
const client = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379, // Redis server port
});

// Handle Redis client errors
client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect to Redis server
client.connect();


/**
 * Enqueue a request for a specific user.
 * @param {string} userId - The ID of the user whose queue the request will be enqueued to.
 * @param {object} request - The request object to be enqueued.
 * @returns {Promise<boolean>} A Promise that resolves to true if the request is successfully enqueued, otherwise false.
 */
async function enqueueRequest(userId, request) {
    try {
        // Push the serialized request to the left end of the user's queue
        await client.lPush(`queue:${userId}`, JSON.stringify(request));
        return true; // Enqueue successful
    } catch (error) {
        console.error('Error enqueuing request:', error);
        return false; // Enqueue failed
    }
}

/**
 * Dequeue a request for a specific user.
 * @param {string} userId - The ID of the user whose queue the request will be dequeued from.
 * @returns {Promise<object|null>} A Promise that resolves to the dequeued request object, or null if the queue is empty.
 */
async function dequeueRequest(userId) {
    try {
        // Pop the request from the right end of the user's queue
        const request = await client.rPop(`queue:${userId}`);
        if (request) {
            return JSON.parse(request); // Return the parsed request object
        } else {
            return null; // Queue is empty
        }
    } catch (error) {
        console.error('Error dequeuing request:', error);
        return null; // Dequeue failed
    }
}

/**
 * Get the length of the queue for a specific user.
 * @param {string} userId - The ID of the user whose queue length will be retrieved.
 * @returns {Promise<number>} A Promise that resolves to the length of the user's queue.
 */
async function getQueueLength(userId) {
    try {
        // Get the length of the user's queue
        const length = await client.lLen(`queue:${userId}`);
        return length; // Return the length of the queue
    } catch (error) {
        console.error('Error getting queue length:', error);
        return 0; // Return 0 if there's an error
    }
}

module.exports = {
    enqueueRequest,
    dequeueRequest,
    getQueueLength
};