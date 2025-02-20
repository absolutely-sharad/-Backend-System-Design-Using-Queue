const request = require('supertest');
const app = require('../src/server'); // Assuming your Express server is exported from server.js

describe('Queue Endpoint Tests', () => {
  let authToken; // Variable to store authentication token for testing authenticated routes

  // Before running the tests, authenticate a user and get the authentication token
  before((done) => {
    request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' }) // Assuming you have a test user in your database
      .end((err, res) => {
        if (err) return done(err);
        authToken = res.body.token; // Store the authentication token for later use
        done();
      });
  });

  // Test case for enqueueing a request
  it('should enqueue a request', (done) => {
    request(app)
      .post('/api/queue/enqueue')
      .set('Authorization', `Bearer ${authToken}`) // Include the authentication token in the request headers
      .send({ data: 'Request data' }) // Sample request data
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Additional assertions if needed
        done();
      });
  });

  // Test case for dequeuing a request
  it('should dequeue a request', (done) => {
    request(app)
      .get('/api/queue/dequeue')
      .set('Authorization', `Bearer ${authToken}`) // Include the authentication token in the request headers
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Additional assertions if needed
        done();
      });
  });

  // Test case for handling errors when dequeuing from an empty queue
  it('should return error when dequeuing from an empty queue', (done) => {
    request(app)
      .get('/api/queue/dequeue')
      .set('Authorization', `Bearer ${authToken}`) // Include the authentication token in the request headers
      .expect(400) // Assuming you return a 400 status code for this scenario
      .end((err, res) => {
        if (err) return done(err);
        // Additional assertions if needed
        done();
      });
  });
});