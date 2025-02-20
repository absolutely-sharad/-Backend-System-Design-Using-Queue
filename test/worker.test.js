const request = require('supertest');
const app = require('../src/server'); // Assuming your Express app is exported from server.js
const { workerService } = require('../src/services/workerService');

describe('Worker Process', () => {
  // Mocking the workerService for testing purposes
  jest.mock('../src/services/workerService', () => ({
    processQueue: jest.fn(),
  }));

  // Reset mock before each test
  beforeEach(() => {
    workerService.processQueue.mockClear();
  });

  // Test case for worker process
  test('Worker processes queue', async () => {
    // Mocking the response from the worker service
    workerService.processQueue.mockResolvedValue('Queue processed successfully');

    // Sending a request to trigger the worker process
    const response = await request(app).post('/process-queue');

    // Expectations
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Queue processed successfully');
    expect(workerService.processQueue).toHaveBeenCalledTimes(1);
  });

  // Test case for error handling in worker process
  test('Worker handles errors', async () => {
    // Mocking the response from the worker service
    workerService.processQueue.mockRejectedValue(new Error('Queue processing failed'));

    // Sending a request to trigger the worker process
    const response = await request(app).post('/process-queue');

    // Expectations
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Queue processing failed');
    expect(workerService.processQueue).toHaveBeenCalledTimes(1);
  });
});