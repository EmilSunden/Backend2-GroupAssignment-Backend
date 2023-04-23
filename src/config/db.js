const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_DB } = process.env;
const { PORT } = process.env;

const connect = async () => {
    try {
        await mongoose.connect(MONGO_DB);
        console.log('Connected successfully')
        console.log(`Server started on PORT: ${PORT}`)

    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    connect,
    MONGO_DB,
    PORT
}