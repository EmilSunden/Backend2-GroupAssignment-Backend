const Router = require('express');
const { getUser } = require('../../controllers/userController/getUser');
const userRoutes = new Router();

userRoutes.get('/user/:username', getUser);

module.exports = {
    userRoutes
}