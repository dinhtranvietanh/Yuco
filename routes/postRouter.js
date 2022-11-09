const router = require('express').Router();
const PostController = require('../controllers/postController')

router.get('/getPosts', PostController.getPosts)
router.post('/createPost', PostController.createPost)
router.patch('/updatePost/:id', PostController.updatePost)
router.delete('/deletePost/:id', PostController.deletePost)

module.exports = router
