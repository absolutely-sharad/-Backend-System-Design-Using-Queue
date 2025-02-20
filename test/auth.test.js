const request = require('supertest');
const app = require('../src/server'); // Assuming your Express app is exported from server.js
const { User } = require('../src/models/userModel');

describe('Authentication Endpoints', () => {
  // Test user data
  const testUser = {
    username: 'testuser',
    password: 'testpassword',
  };

  // Clear users collection before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Test user registration
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with existing username', async () => {
      // Register the user first
      await User.create(testUser);

      // Attempt to register with the same username
      await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(400);
    });
  });

  // Test user login
  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Register test user before login tests
      await User.create(testUser);
    });

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send(testUser)
        .expect(200);

      expect(res.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
      // Provide incorrect password
      const wrongPasswordUser = {
        username: testUser.username,
        password: 'incorrectpassword',
      };

      await request(app)
        .post('/api/auth/login')
        .send(wrongPasswordUser)
        .expect(401);
    });

    it('should not login with non-existing username', async () => {
      // Provide non-existing username
      const nonExistingUser = {
        username: 'nonexistinguser',
        password: 'password',
      };

      await request(app)
        .post('/api/auth/login')
        .send(nonExistingUser)
        .expect(401);
    });
  });
});