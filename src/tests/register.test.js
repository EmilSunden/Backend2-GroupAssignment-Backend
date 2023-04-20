require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const mongoose = require('mongoose');
const User = require('../model/User');

const MONGO_DB  = process.env.MONGO_DB;

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

describe("Testing server endpoint /register", () => {
    test("Should return 400 if no data is entered", async () => {
       const response = await request(server).post('/api/auth/register').send({});
       expect(response.status).toBe(400);
    });

    test("Should return 201 if user was created", async () => {
        const response = await request(server).post('/api/auth/register').send(user);
        expect(response.status).toBe(201);
    });

    test("Should return 409 if user already exsist", async () => {
        const response = await request(server).post('/api/auth/register').send(user);
        expect(response.status).toBe(409);
    });

});

