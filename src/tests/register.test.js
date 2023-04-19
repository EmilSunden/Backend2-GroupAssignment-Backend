require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const mongoose = require('mongoose');

const MONGO_DB  = process.env.MONGO_DB;

const randomNum = Math.floor(Math.random() * 1000);

describe("Testing server endpoint /register", () => {

    beforeEach(async () => {
        await mongoose.connect(MONGO_DB,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
            mongoose.set('strictQuery', false);
    }); 

    afterEach(async () => {
        await mongoose.connection.close();
    });

    test("Should return 400 if no data is entered", async () => {
       const response = await request(server).post('/api/auth/register').send({});

       expect(response.status).toBe(400);

    });

    test("Should return 201 if user was created", async () => {

        const response = await request(server).post('/api/auth/register').send({username: `UserNr${randomNum}`, password: 'test'});

        expect(response.status).toBe(201);
    });

    test("Should return 400 if user already exsist", async () => {
        const response = await request(server).post('/api/auth/register').send({username: `UserNr${randomNum}`, password: 'test'});

        expect(response.status).toBe(400);
    });

});

