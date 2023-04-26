const User = require("../../model/User");

async function unfollowUser(req, res) {
  const followerId = req.user.id;
  console.log(followerId)
  const { id } = req.params;

  try {
    const user = await User.findById(followerId)
      .populate("following")
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const following = user.following;
    if (!following) {
      return res.status(404).json({ message: "Following not found" });
    }

    const alreadyFollowing = following.some((f) => f.user.toString() === id);
    if (!alreadyFollowing) {
      return res.status(409).json({ message: "Not following this user" });
    }

    await User.updateOne(
      { _id: followerId },
      {
        $pull: {
          following: { user: id },
        },
      }
    );
    await User.updateOne(
      { _id: id },
      {
        $pull: {
          followers: { user: followerId },
        },
      }
    );

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error unfollowing user" });
  }
}

module.exports = { 
    unfollowUser 
};
