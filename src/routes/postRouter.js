const Router = require('express');
const PostController = require('../controllers/postController');
const commentController = require('../controllers/commentController')
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router()


router.post('/post', authMiddleware, PostController.create);
router.get('/post/:id', authMiddleware, PostController.getOne);
router.delete('/post/:id/delete', authMiddleware, PostController.remove);
router.patch('/post/:id', authMiddleware, PostController.update);


//To Rework
router.post('/post/comments', authMiddleware, commentController.create);
router.get("/post/comments/:id", authMiddleware, commentController.postComments);


module.exports.postsRoutes = router;

