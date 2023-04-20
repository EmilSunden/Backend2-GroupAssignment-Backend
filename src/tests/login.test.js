require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const mongoose = require('mongoose');
const User = require('../model/User');

const MONGO_DB = process.env.MONGO_DB;

const user = { 
    username: 'testuser',
    password: 'testpassword'
}

beforeAll(async () => {
    await mongoose.connect(MONGO_DB,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
}); 

afterAll(async () => {
    await User.deleteMany({username: user.username})
    await mongoose.disconnect();
});

describe("Testing server endpoint /login", () => {
    it("Should return 201 if user was created", async () => {
        const response = await request(server)
          .post("/api/auth/register")
          .send(user);
        expect(response.status).toBe(201);
      });

    it("Should return 200 if login was successful", async () => {
        const response = await request(server).post('/api/auth/login').send(user);
        expect(response.status).toBe(200);
    });


    it("Should return 400 if password is wrong", async () => {
        const response = await request(server).post('/api/auth/login').send({username: user.username, password: 'password'});
        expect(response.status).toBe(400);
    });

    it("Should return 404 if user not found", async () => {
        const response = await request(server).post('/api/auth/login').send({username: 'kungen', password: '1234'});
        expect(response.status).toBe(404);
    });
});