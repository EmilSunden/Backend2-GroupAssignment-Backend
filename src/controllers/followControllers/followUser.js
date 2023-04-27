const User = require("../../model/User");

async function followUser(req, res) {
  const followerId = req.user.id;
  const { id } = req.params;

  if (followerId === id) {
    console.log("You can't follow yourself!")
    return res.status(400).json({ message: "You can't follow yourself!" })
  }

  try {
    const { following } = await User.findById(followerId)
      .populate("following")
      .exec();

    const alreadyFollowing = following.some((f) => f.user.toString() === id);
    if (alreadyFollowing) {
      return res.status(409).json({ message: "Already following this user" });
    }

    const followingUser = await User.findById(id);
    if (!followingUser) {
      return res.status(404).json({ message: "Following user not found" });
    }

    await User.updateOne(
      { _id: followerId },
      {
        $addToSet: {
          following: { user: id, username: followingUser.username },
        },
      }
    );
    await User.updateOne(
      { _id: id },
      {
        $addToSet: {
          followers: { user: followerId, username: req.user.username },
        },
      }
    );

    res.status(200).json({ message: "User followed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error following user" });
  }
}

module.exports = { followUser };
