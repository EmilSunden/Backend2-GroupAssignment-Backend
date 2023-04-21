const Router = require('express');
const PostController = require('../../controllers/postController');
const router = new Router()


router.post('/post', PostController.create);
router.get('/posts', PostController.getAllUsersPosts );
router.get('/posts/:userId', PostController.getUserPosts)
router.get('/post/:id', PostController.getOne);
router.delete('/post/:id/delete', PostController.remove);
router.patch('/post/:id', PostController.update);

module.exports.postsRoutes = router;

