const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes/authRoutes');
require('dotenv').config();


server.use(cors());
server.use(express.json());

//crashar pga tom authRouter
server.use("/api/auth", authRouter);

// Connect to MongoDB
const database = process.env.MONGO_DB;


const connect = async () => { 
    try { 
        await mongoose.connect(database);
        console.log('MongoDB connected');
    } catch (err) { 
        console.log(err)
    }

}

connect()

server.listen(5050)