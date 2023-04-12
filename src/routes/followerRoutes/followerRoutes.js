const express = require('express');
const followRoute = express.Router();

const { followUser } = require('../../controllers/followerControllers/followController');
const { getFollowers } = require('../../controllers/followerControllers/getFollowersController')

followRoute.get('/:email/followers', getFollowers);

followRoute.post('/follow', followUser);
  
module.exports = {
    followRoute
}
  