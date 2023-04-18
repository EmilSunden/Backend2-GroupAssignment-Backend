const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/User');
const Router = require("express")
const router = new Router();
const { authMiddleware } = require('../../middleware/authMiddleware');
const {loginValidation} = require('../../validation/validationSchemas');
require('dotenv').config();
// add valation later

const secretKey = process.env.secret_key

exports.login = async function login (req, res)  {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(404).json({message:'User not found'})
        }
        const isValidPass = bcrypt.compareSync(password, user.password)
        if (!isValidPass) {
            return res.status(400).json({message:'Password is not correct'})
        }

        const token = jwt.sign({id:user._id, username: user.username}, secretKey, {expiresIn: "1h"})
        return res.cookie("UserCookies", token, {
            maxAge: 1000 * 60 * 60, 
            path: "api/auth/login",
            httpOnly: true
        })
            .status(200).json({
                token, user: {
                    status: "200", text: "You are logged in", id: user._id, username: user.username
                }
            })
    } catch (err) {
        console.log(err)
        res.satus(500).send({message: "Server error"})
    }
}