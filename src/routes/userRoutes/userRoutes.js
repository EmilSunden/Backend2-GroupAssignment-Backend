const Router = require('express');
const { getUser } = require('../../controllers/userController/getUser');
const { getUsers } = require('../../controllers/userController/getUsers');
const userRoutes = new Router();

userRoutes.get('/user/:username', getUser);
userRoutes.get('/users', getUsers)

module.exports = {
    userRoutes
}