const request = require('supertest');
const { server } = require('../index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const MONGO_DB  = process.env.MONGO_DB;

describe('POST /api/follow', () => {
    let token;

    beforeEach(async () => {
      await mongoose.connect(MONGO_DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
    });

    afterEach(async () => {
      await mongoose.connection.close();
    })
  
    beforeAll(async () => {
      // Login to get a valid token
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'trollet2',
          password: 'trollet2',
        });
      token = response.body.token;
    });
  
    it('should require authentication', async () => {
      const response = await request(server)
        .post('/api/auth/follow')
        .send({
          followingId: '643e958adfd32b90f0c8f1e1',
        });
  
      expect(response.status).toBe(401);
    });
  
    it('should allow authenticated users to follow other users', async () => {
      const response = await request(server)
        .post('/api/auth/follow')
        .set('Authorization', `Bearer ${token}`)
        .send({
          followingId: '643e958adfd32b90f0c8f1e1',
        });
  
      expect(response.status).toBe(200);
    });
  });