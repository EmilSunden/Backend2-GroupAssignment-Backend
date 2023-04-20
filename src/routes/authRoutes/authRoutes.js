const express = require('express');
const authRoutes = express.Router();
const { register } = require('../../controllers/authControllers/register');
const { login } = require('../../controllers/authControllers/login');
const authMiddleware = require('../../middleware/authMiddleware')

const { getAuthCookie } = require('../../middleware/getAuthCookie');

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/auth', authMiddleware, getAuthCookie)

exports.authRoutes = authRoutes;