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


    
});