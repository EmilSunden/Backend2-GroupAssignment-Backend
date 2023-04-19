const { connect } = require('../config/db');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config()
const MONGO_DB  = process.env.MONGO_DB;

jest.mock('mongoose');

describe('Test MONGO_DB connection', () => {
  test('It should connect to the MONGO_DB', async () => {
    await connect(MONGO_DB);
    mongoose.set('strictQuery', false);
    expect(mongoose.connect).toHaveBeenCalledWith(MONGO_DB);
  });
});