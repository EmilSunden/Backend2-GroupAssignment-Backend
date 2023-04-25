const User = require('../../model/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).json({ message: 'No users found'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Something went wrong!'})
    }
}
module.exports = {
    getUsers
}