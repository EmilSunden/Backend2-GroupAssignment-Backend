const Router = require('express');
const PostController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const router = new Router()


router.post('/posts/create', PostController.create);
router.get('/posts', PostController.getAllUsersPosts );
router.get('/posts/user/:username', PostController.getUserPosts)
router.get('/following/:username', PostController.getFollowingPosts)
router.get('/posts/:id', PostController.getOne);
router.delete('/posts/:id/delete', PostController.remove);
router.patch('/posts/:id/edit', PostController.update);


//To Rework
router.post('/posts/comments/:id/create', commentController.create);
router.get('/comments', commentController.all);
router.get("/posts/comments/:id", commentController.postComments);
router.patch("/posts/comments/:id/edit", commentController.update);
router.delete("/posts/comments/:id/delete", commentController.delete
);


module.exports.postsRoutes = router;

