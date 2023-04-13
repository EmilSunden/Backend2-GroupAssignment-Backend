const express = require('express')
const router = express.Router()

const { followUser } = require('../../controllers/followControllers/postFollow')
const { getFollowers } = require('../../controllers/followControllers/getFollowers')

router.post('/users/follow', followUser);
router.get('/:userId/followers', getFollowers);

module.exports = router
