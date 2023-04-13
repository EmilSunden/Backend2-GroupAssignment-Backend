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

    test("Should return 500 if no data is entered", async () => {
       const response = await request(server).post('/api/auth/register').send({});

       expect(response.status).toBe(500);
       
    });

    test("Should return 201 if user was created", async () => {

        const response = await request(server).post('/api/auth/register').send({username: 'test', password: 'test'});

        expect(response.status).toBe(201);
    });

});


