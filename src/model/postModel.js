const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String, required: true,
    },
    text: {
        type: String, required: true,
    },
    description: String,
    views: {
        type: Number, default: 0,
    },
    user: {
        type: ObjectId,
        ref: "User", required: true,
    },
    avatar:{ type:String }
});

module.exports = model('Post', postSchema)