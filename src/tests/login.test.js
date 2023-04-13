require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const { database } = require('../index');
const mongoose = require('mongoose');

describe("Testing server endpoint /register", () => {

    beforeEach(async () => {
        await mongoose.connect(database,
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


});