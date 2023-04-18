const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.secret_key;
const jwt = require('jsonwebtoken');

const User = require('../model/User')

async function getAuthCookie(req, res) {
    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1h"})
        return res.cookie("AuthCookies", token, {
            maxAge: 1000 * 60 * 60, path: "api/auth", httpOnly: true
        })
            .status(200).json({
                token, user: {
                    status: "200", text: "Middleware Auth + Cookies.", id: user.id, username: user.username
                }
            })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAuthCookie
}