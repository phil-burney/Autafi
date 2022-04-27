
const supertest = require('supertest');
const { app, server } = require('./index');
const request = supertest(app);

const { connectDB, disconnectDB } = require('./db');

describe('API test', () => {
  beforeAll(() => {
    connectDB();
  });

  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe('POST /api/test', () => {
    it('example request using a mocked database instance', async () => {
      const res = await request.post('/api/test', {
          name: 'Test'
      });

      expect(res.status).toBe(201);
    });
  });
});