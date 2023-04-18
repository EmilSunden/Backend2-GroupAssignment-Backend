const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { postsRoutes } = require("./routes/postRouter");
const { authRoutes } = require('./routes/authRoutes/authRoutes');
const { followerRoutes } = require('./routes/followRoutes/followRoutes')
require('dotenv').config();


server.use(cors());
server.use(express.json());

server.use("/api/auth", postsRoutes)
server.use("/api/auth", authRoutes)
server.use("/api/auth", followerRoutes)

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

module.exports = { connect, database, server };