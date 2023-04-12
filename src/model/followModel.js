const {Schema, model} = require('mongoose')

const followersSchema = new Schema({
    follower: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    following: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Followers', followersSchema)