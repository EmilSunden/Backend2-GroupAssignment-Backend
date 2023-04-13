require('dotenv').config({ path: './src/.env' });
const request = require('supertest');
const { server } = require('../index');
const { database } = require('../index');
const mongoose = require('mongoose');

const randomNum = Math.floor(Math.random() * 1000);

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

    test("Should return 500 if no data is entered", async () => {
       const response = await request(server).post('/api/auth/register').send({});

       expect(response.status).toBe(500);
       
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


