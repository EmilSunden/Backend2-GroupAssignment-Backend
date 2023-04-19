const User = require('../../model/User');

async function followUser(req, res) {
  const followerId  = req.user.id
  const { followingId } = req.body;

  try {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower) {
      return res.status(400).json({ message: 'Follower not found' });
    }

    if (!following) {
      return res.status(400).json({ message: 'Following user not found' });
    }

    if (follower.following.some((f) => f._id.toString() === followingId)) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    follower.following.push(following);
    following.follower.push(follower);

    await follower.save();
    await following.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error following user' });
  }
}

module.exports = { followUser };

