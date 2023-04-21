const Router = require('express');
const router = new Router()
const commentController = require('../../controllers/commentController');

router.post('/post/comments', commentController.create);
router.get("/post/comments/:id", commentController.postComments);
router.patch("/post/comments/:id", commentController.update);
router.delete("/post/comments/:id", commentController.delete
);

module.exports.commentsRoutes = router;