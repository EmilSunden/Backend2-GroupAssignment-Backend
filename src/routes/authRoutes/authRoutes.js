const express = require('express');
const authRoutes = express.Router();
const { register } = require('../../controllers/authControllers/register');

authRoutes.post('/register', register);

exports.authRoutes = authRoutes;