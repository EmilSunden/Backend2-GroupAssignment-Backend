const Router = require('express');
const PostController = require('../controllers/postController');
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router()


router.post('/post', authMiddleware, PostController.create);

module.exports.postsRoutes = router;