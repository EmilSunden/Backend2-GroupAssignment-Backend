const request = require('supertest');
const { server } = require('../index');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config()
const { MONGO_DB } = process.env;

describe('GET /api/auth/auth', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(MONGO_DB);
    console.log('MongoDB connected');

    // Login the user and get the token
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'trollet2',
        password: 'trollet2',
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should respond with a cookie and a token', async () => {
    const response = await request(server)
      .get('/api/auth/auth')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.header['set-cookie']).toBeDefined();
  });

  it('should respond with an error if token is not provided', async () => {
    const response = await request(server)
      .get('/api/auth/auth');

    expect(response.status).toBe(401);
  });
});

