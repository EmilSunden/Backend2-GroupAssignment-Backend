const { connect, database } = require('../index');
const mongoose = require('mongoose');

jest.mock('mongoose');

describe('Test database connection', () => {
  test('It should connect to the database', async () => {
    await connect(database);
    expect(mongoose.connect).toHaveBeenCalledWith(database);
  });
});