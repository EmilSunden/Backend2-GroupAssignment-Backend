const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        follower: [
            {
              type: ObjectId,
              required: true,
            },
          ],
          following: [
            {
              type: ObjectId,
              required: true,
            },
          ],
        avatar: {type: String}
    },
    {timestamps: true}
)

module.exports = model('User', User)