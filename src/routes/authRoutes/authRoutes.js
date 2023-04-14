const express = require('express');
const authRoutes = express.Router();
const { register } = require('../../controllers/authControllers/register');
const { login } = require('../../controllers/authControllers/login');
const User = require('../../model/User');
const authMiddleware = require('../../middleware/authMiddleware')
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.secret_key


authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/auth', authMiddleware,
    async (req, res) => {
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
    })

exports.authRoutes = authRoutes;