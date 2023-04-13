const express = require('express');
const authRoutes = express.Router();
const { register } = require('../../controllers/authControllers/register');
const { login } = require('../../controllers/authControllers/login');

authRoutes.post('/register', register);
authRoutes.post('/login', login);

exports.authRoutes = authRoutes;