const express = require('express');
const server = express();
const cors = require('cors');
const { postsRoutes } = require("./routes/postRouter");
const { authRoutes } = require('./routes/authRoutes/authRoutes');
const { followerRoutes } = require('./routes/followRoutes/followRoutes')
require('dotenv').config();
const PORT = process.env.PORT
const { connect } = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');
// Connect to MongoDB
connect()

server.use(cors({
    origin: true,
    credentials: true
}));
server.use(express.json());

server.use("/api/auth", authRoutes)
server.use("/api/", authMiddleware, postsRoutes)
server.use("/api/", authMiddleware, followerRoutes)

server.listen(PORT)

module.exports = { 
    server 
};