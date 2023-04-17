const express = require('express');
const server = express();
const cors = require('cors');
const { postsRoutes } = require("./routes/postRouter");
const { authRoutes } = require('./routes/authRoutes/authRoutes');
require('dotenv').config();

const { connect } = require('./config/db')

server.use(cors({
    origin: true,
    credentials: true
}));
server.use(express.json());

server.use("/api/auth", postsRoutes)
server.use("/api/auth", authRoutes)

// Connect to MongoDB
connect()

server.listen(5050, () => {
    console.log('Port running on http://localhost:5050')
})

module.exports = { 
    server 
};