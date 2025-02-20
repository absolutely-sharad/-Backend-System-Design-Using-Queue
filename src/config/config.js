const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getEnvVariable = (key, defaultValue) => {
  if (process.env[key]) {
    return process.env[key];
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  throw new Error(`Missing required environment variable: ${key}`);
};

module.exports = {
  // Application settings
  app: {
    port: getEnvVariable('PORT', 3000),
    env: getEnvVariable('NODE_ENV', 'development'),
  },

  // Database settings
  db: {
    uri: getEnvVariable('MONGODB_URI', 'mongodb+srv://ayushshivrai098:HybKUvYf7bj77Apc@cluster0.pw5xdm9.mongodb.net/Queue'),
  },

  // Redis settings
  redis: {
    host: getEnvVariable('REDIS_HOST', '127.0.0.1'),
    port: getEnvVariable('REDIS_PORT', 6379),
  },

  // Authentication settings
  auth: {
    jwtSecret: getEnvVariable('JWT_SECRET', 'your_jwt_secret'),
    jwtExpire: getEnvVariable('JWT_EXPIRE', '1h'),
  },

  // Logging settings
  logging: {
    level: getEnvVariable('LOG_LEVEL', 'info'),
  },

  // Monitoring settings
  monitoring: {
    grafanaHost: getEnvVariable('GRAFANA_HOST', 'http://localhost:3000'),
  },
};