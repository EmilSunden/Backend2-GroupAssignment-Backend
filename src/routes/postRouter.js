const Router = require('express');
const PostController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const router = new Router()


router.post('/post', PostController.create);
router.get('/posts', PostController.getAllUsersPosts );
router.get('/posts/:userId', PostController.getUserPosts)
router.get('/post/:id', PostController.getOne);
router.delete('/post/:id/delete', PostController.remove);
router.patch('/post/:id', PostController.update);


//To Rework
router.post('/post/comments', commentController.create);
router.get("/post/comments/:id", commentController.postComments);
router.patch("/post/comments/:id", commentController.update);
router.delete("/post/comments/:id", commentController.delete
);


module.exports.postsRoutes = router;

