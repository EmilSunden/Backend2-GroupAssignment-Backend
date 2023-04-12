const { userSchema } = require('./model/userModel');
const { followersSchema } = require('./model/followModel');

async function followUser(req, res) {
    const followerEmail = req.body.followerEmail;
    const followingEmail = req.body.followingEmail;
  
    try {
      const follower = await userSchema.findOne({ email: followerEmail });
  
      if (!follower) {
        return res.status(400).json({ message: 'Follower not found' });
      }
  
      const following = await userSchema.findOne({ email: followingEmail });
  
      if (!following) {
        return res.status(400).json({ message: 'Following user not found' });
      }
  
      const existingFollower = await followersSchema.findOne({ follower: follower._id, following: following._id });
  
      if (existingFollower) {
        return res.status(400).json({ message: 'Already following this user' });
      }
  
      const newFollower = new followersSchema({ follower: follower._id, following: following._id });
      await newFollower.save();
  
      res.status(200).json({ message: 'User followed successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error following user' });
    }
  }
  
  module.exports = { followUser };
