const { model, Schema, ObjectId } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    user: {
      id: {
        type: ObjectId,
        ref: "User",
        required: true
      },
      username: {
        type: String,
        required: true
      }
    },
    
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
