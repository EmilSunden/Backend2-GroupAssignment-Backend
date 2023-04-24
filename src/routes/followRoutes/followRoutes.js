const Router = require('express');
const followerRoutes = new Router();

const { getUserFollowers } = require('../../controllers/followControllers/getUserFollowers');
const { followUser } = require('../../controllers/followControllers/followUser');

followerRoutes.post('/follow/:id', followUser);
followerRoutes.get('/followers/:username', getUserFollowers);

module.exports = {
    followerRoutes
}