const mongoose = require('mongoose');

require('dotenv').config();

const database = process.env.MONGO_DB;

const connect = async () => { 
    try { 
        await mongoose.connect(database);
        console.log('MongoDB connected');
    } catch (err) { 
        console.log(err)
    }
}

module.exports = {
    connect,
    database,
}