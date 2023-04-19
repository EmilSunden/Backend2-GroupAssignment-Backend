require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const mongoose = require('mongoose');

const MONGO_DB = process.env.MONGO_DB;

describe("Testing server endpoint /register", () => {

    beforeEach(async () => {
        await mongoose.connect(MONGO_DB,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });

    }); 

    afterEach(async () => {
        await mongoose.connection.close();
    });

    test("Should return 200 if login was successful", async () => {

        const response = await request(server).post('/api/auth/login').send({username: 'elin1', password: 'test'});

        expect(response.status).toBe(200);
    });


    test("Should return 400 if password is wrong", async () => {
        const response = await request(server).post('/api/auth/login').send({username: 'elin1', password: 'test123'});

        expect(response.status).toBe(400);
    });

    test("Should return 404 if user not found", async () => {
        const response = await request(server).post('/api/auth/login').send({username: 'kungen', password: '1234'});

        expect(response.status).toBe(404);
    });

});