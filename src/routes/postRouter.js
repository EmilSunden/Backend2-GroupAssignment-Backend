const Router = require('express');
const PostController = require('../controllers/postController');
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router()


router.post('/post', authMiddleware, PostController.create);
router.get('/post/:id', authMiddleware, PostController.getOne);
router.delete('/post/:id/delete', authMiddleware, PostController.remove);
router.patch('/post/:id', authMiddleware, PostController.update);



module.exports.postsRoutes = router;

