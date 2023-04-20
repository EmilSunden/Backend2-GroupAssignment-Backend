const bcrypt = require('bcrypt');
const User = require('../../model/User');
const {registerValidation} = require('../../validation/validationSchemas');


exports.register = async function register (req, res) {
    try {
        const validation = registerValidation.validate(req.body)
        if (validation.error) {
            return res.status(400).json({message: validation.error.details[0].message})
        } else {
            const {username, password} = req.body
            const existUser = await User.findOne({username})
            if (existUser) {
                return res.status(409).json({message: `${username} already exist`})
            }
            
            const hashedPassword = await bcrypt.hash(password, 6)
            const user = new User({username, password: hashedPassword})

            await user.save()
            return res.status(201).json({message: "User was created.", insertedId: user._id.toString()})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: "Server error"})
    }
}
