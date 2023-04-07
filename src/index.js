const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const database = process.env.MONGO_DB;


const connect = async () => { 
    try { 
        await mongoose.connect(database, {useUnifideTopology: true, useNewUrlParser: true});
        console.log('MongoDB connected');
    } catch (err) { 
        console.log(err)
    }

}

connect()

server.listen(5050)