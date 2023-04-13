const User = require('../models/User')

async function getFollowers(req, res) {
  const userId = req.params.userId

  try {
    const user = await User.findById(userId).populate('followers', 'username avatar')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ followers: user.followers })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getFollowers }
