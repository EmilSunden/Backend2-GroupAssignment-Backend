const User = require('./models/userModel');

async function followUser(req, res) {
  const followerId = req.user._id;
  const followingId = req.params.userId;

  try {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (follower.following.includes(followingId)) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    follower.following.push(followingId);
    following.followers.push(followerId);

    await Promise.all([follower.save(), following.save()]);

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error following user' });
  }
};

module.exports = { followUser };