const {Schema, model} = require('mongoose')

const Post = new Schema({
    username:{ type: String, required: true, unique: true },
    title:{ type: String, required: true },
    body:{ type: String, required: true },
    likes: { type: Number },
    comments: [
        { type: String }, 
    ],
    avatar:{ type:String }
});

module.exports = model('Posts', Post)