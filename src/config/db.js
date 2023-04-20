const mongoose = require('mongoose');

require('dotenv').config();

const { MONGO_DB } = process.env;

const connect = async () => { 
    try { 
        await mongoose.connect(MONGO_DB);
        console.log('Connected successfully')
        
    } catch (err) { 
        console.log(err.message)
    }
}

module.exports = {
    connect,
    MONGO_DB
}