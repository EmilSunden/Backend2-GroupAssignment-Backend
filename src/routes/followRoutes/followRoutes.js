const Router = require('express');
const followerRoutes = new Router();
const PostController = require('../../controllers/postController');

const { getUserFollowers } = require('../../controllers/followControllers/getUserFollowers');
const { followUser } = require('../../controllers/followControllers/followUser');

followerRoutes.post('/follow/:id', followUser);
followerRoutes.get('/followers/:username', getUserFollowers);
followerRoutes.get('/following/:id', PostController.getFollowingPosts)

module.exports = {
    followerRoutes
}