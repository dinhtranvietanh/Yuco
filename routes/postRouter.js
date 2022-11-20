const router = require('express').Router();
const PostController = require('../controllers/postController')
const User = require('../middleware/user')

router.get('/getPosts', PostController.getPosts)
router.post('/createPost', User, PostController.createPost)
router.patch('/updatePost/:id', User, PostController.updatePost)
router.delete('/deletePost/:id', User, PostController.deletePost)
router.patch('/updatePost/:id/like',User, PostController.likePost)
router.patch('/updatePost/:id/unlike',User, PostController.unLikePost)
router.get('/getPost/:id',User, PostController.getDetailPost)
router.get('/authPost/:id', PostController.getUserPost)

module.exports = router
