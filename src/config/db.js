const mongoose = require('mongoose');

require('dotenv').config();

const { MONGO_DB } = process.env;

const connect = async () => { 
    try { 
        await mongoose.connect(MONGO_DB);
    } catch (err) { 
        console.log(err)
    }
}

module.exports = {
    connect,
    MONGO_DB
}