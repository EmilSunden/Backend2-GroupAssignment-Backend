const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        username: { type: String },
      },
    ],
    following: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        username: { type: String },
      },
    ],
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", User);
