const express = require('express');
const authRoutes = express.Router();
const { register } = require('../../controllers/authControllers/register');
const { login } = require('../../controllers/authControllers/login');
const authMiddleware = require('../../middleware/authMiddleware')

const { getAuthCookie } = require('../../middleware/getAuthCookie');

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/auth', authMiddleware, getAuthCookie)

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();
const secretKey = process.env.secret_key


authRoutes.post('/register', register);
authRoutes.post('/login', login);

authRoutes.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
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
        }
    })


exports.authRoutes = authRoutes;