const redis = require('redis');
const { promisify } = require('util');
const logger = require('../utils/logger');

// Create Redis client
const createRedisClient = () => {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    // Add more configuration options as needed
  });

  // Promisify Redis client methods for easier async/await usage
  redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  redisClient.setAsync = promisify(redisClient.set).bind(redisClient);

  // Handle Redis client errors
  redisClient.on('error', (error) => {
    logger.error('Redis error:', error);
  });

  // Return the configured Redis client
  return redisClient;
};

module.exports = {
  // Export a function to create and configure the Redis client
  createRedisClient,
};