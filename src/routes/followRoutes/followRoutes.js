const Router = require('express');
const followerRoutes = new Router();

const authMiddleware = require("../../middleware/authMiddleware");
const { getUserFollowers } = require('../../controllers/followControllers/getUserFollowers');
const { followUser } = require('../../controllers/followControllers/followUser');

followerRoutes.post('/follow', authMiddleware, followUser);
followerRoutes.get('/:userId/followers', authMiddleware, getUserFollowers);

module.exports = {
    followerRoutes
}