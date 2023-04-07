const {Schema, model} = require('mongoose')

const Follow = new Schema({
    username:{ type: String, required: true, unique: true },
});

module.exports = model('Follow', Follow)