const Post = require("../model/Post");
const User = require("../model/User");
const { PostService } = require("../services/PostService");
const { postBodyValidation } = require("../validation/validationSchemas");
const { isMongoId } = require("validator");
const mongoose = require('mongoose')

module.exports.create = async (req, res) => {
  const { title, text } = req.body;
  const bodyRequestData = {
    title,
    text,
    user: req.user.id,
  };

  const validation = await postBodyValidation.validate(bodyRequestData);
  if (validation.error) {
    return res.status(400).json(validation.error.details[0].message);
  } else {
    const post = await PostService.create(validation.value);
    try {
      const result = await PostService.save(post);
      if (result) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json({ error: `Can't create a post` });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports.getAllUsersPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "user",
      select: "-password",
    });
    if (posts) {
      res.send(posts);
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Can't get post` });
  }
};

module.exports.getProfilePosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (user) {
      const posts = await Post.find({ user }).populate({
        path: "user",
        select: "username",
      });

      if (posts) {
        console.log(`Found ${posts.length} posts by user ${username}.`);
        res.send(posts);
      } else {
        res.status(404).json({ message: "No posts found" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Can't get posts for that user` });
  }
};

module.exports.getFollowingPosts = async (req, res) => {
    try {
      const { id } = req.params;
      // Find the user based on their id
      const user = await User.findOne( {_id: id} );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const following = await Promise.all(
        user.following.map(async (element) => {
          const { ObjectId } = require("mongodb");
          const userId = element.user;
          const myObjectId = new ObjectId(userId);
          const myObjectIdString = myObjectId.toString();
  
          const foundFollower = await Post.find({ user: myObjectIdString })
            .populate("user", "username");
          return foundFollower;
        })
      );
  
      res.send({ following: following });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `Can't get posts for that user` });
    }
  };
  

module.exports.getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    if (isMongoId(postId)) {
      const postGetOne = await PostService.findPost(postId);
      if (postGetOne) {
        res.send(postGetOne);
      } else {
        return res.status(500).json({ message: `Sry, can't get post` });
      }
    } else {
      res.status(404).json({ message: "id is not correct" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Can't get post` });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const postId = req.params.id;
    if (isMongoId(postId)) {
      const postRemove = await PostService.remove(postId);

      if (postRemove) {
        res.status(200).json({ message: "Deleted" });
      } else if (postRemove === null) {
        res.status(404).json({ message: `Sry, post not found` });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      return res.status(404).json({ message: "id is not correct" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

module.exports.update = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text } = req.body;
    const bodyRequestData = {
      title,
      text,
      user: req.user.id,
    };
    const validation = await postBodyValidation.validate(bodyRequestData);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    } else {
      const validation = await postBodyValidation.validate(bodyRequestData);

      if (validation.error) {
        return res.status(400).json(validation.error.details[0].message);
      } else {
        const updatedPost = await PostService.update(postId, validation.value);
        if (updatedPost) {
          res.status(200).json({ message: "Post updated" });
        } else {
          res.status(500).json({ message: "Server Error" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Can't updated post, server error` });
  }
};
