const User = require('../../model/User');

async function getUserFollowers(req, res) {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('follower');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ followers: user.follower })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserFollowers
}