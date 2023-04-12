const bcrypt = require('bcrypt');
const User = require('../../model/userModel');
//validation add later

exports.register = async function register (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors})
        }
        const {username, password} = req.body
        const existUser = await User.findOne({username})
        if (existUser) {
            return res.status(400).json({message: `${username} already exist`})
        }
        const hashedPassword = await bcrypt.hash(password, 6)
        const user = new User({username, password: hashedPassword})

        await user.save()
        return res.json({message: "User was created."})
    } catch (err) {
        console.log(err)
        res.send({message: "Server error"})
    }

}
