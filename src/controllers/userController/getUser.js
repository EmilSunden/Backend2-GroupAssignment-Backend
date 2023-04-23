const User = require('../../model/User');

async function getUser(req, res) {
    const { username } = req.params;

    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUser
}