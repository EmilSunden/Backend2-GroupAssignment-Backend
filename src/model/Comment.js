const {model, Schema, ObjectId} = require('mongoose')


const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        post: {
            type: ObjectId,
            ref: "Post",
            required: true,
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);


module.exports = model('Comments', commentSchema)