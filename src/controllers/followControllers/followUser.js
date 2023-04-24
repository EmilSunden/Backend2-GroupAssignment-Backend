const User = require('../../model/User');

async function followUser(req, res) {
  const followerId  = req.user.id
  const { id } = req.params;

  try {
    const followers = await User.findById(followerId);
    const following = await User.findById(id);

    if (!followers) {
      return res.status(404).json({ message: 'Follower not found' });
    }

    if (!following) {
      return res.status(404).json({ message: 'Following user not found' });
    }

    if (followers.following.some((f) => f.user.toString() === id)) {
      return res.status(409).json({ message: 'Already following this user' });
    }

    followers.following.push({ user: id, username: following.username });
    following.followers.push({ user: followerId, username: followers.username });

    await followers.save();
    await following.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error following user' });
  }
}

module.exports = { followUser };

