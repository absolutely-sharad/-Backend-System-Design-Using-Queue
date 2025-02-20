// Import necessary modules
const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client
const redisClient = redis.createClient();

// Promisify Redis client methods to work with async/await
const lpopAsync = promisify(redisClient.lpop).bind(redisClient);

/**
 * Function to process queued requests.
 * This function continuously fetches requests from the queue and processes them.
 * It logs each request to the console and simulates processing time.
 */
async function processQueue() {
    try {
        console.log('Worker started. Waiting for requests...');

        // Continuously fetch requests from the queue
        while (true) {
            // Fetch the next request from the queue
            const request = await lpopAsync('queue');

            // If the queue is empty, break out of the loop
            if (!request) {
                console.log('Queue is empty. Worker is idling...');
                break;
            }

            // Process the request (example: log to console)
            console.log(`Processing request: ${request}`);

            // Simulate processing time (replace with actual processing logic)
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        console.log('Worker finished processing all requests.');
    } catch (error) {
        // Handle errors gracefully
        console.error('Error processing queue:', error);
        process.exit(1); // Terminate the worker process on error
    } finally {
        // Clean up resources (close Redis client)
        redisClient.quit();
        console.log('Redis connection closed.');
    }
}

// Start processing the queue
processQueue();

// Export the function for testing purposes
module.exports = processQueue;