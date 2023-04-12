const { userSchema } = require('./model/userModel');
const { followersSchema } = require('./model/followModel');

async function getFollowers(req, res) {
  const userEmail = req.params.email; // username instead of email perhaps

  try {
    const user = await userSchema.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const followers = await followersSchema.find({ following: user._id }).populate('follower', 'email');

    res.status(200).json(followers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting followers' });
  }
}

module.exports = { getFollowers };
