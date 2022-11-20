const router = require('express').Router()
const commentController = require('../controllers/commentController')
const User = require('../middleware/user')

router.post('/comment', User,  commentController.createComment)
router.delete('/comment/:id', User, commentController.deleteCommnet)
router.patch('/comment/:id', User, commentController.updateComment)
router.patch('/comment/:id/like', User, commentController.likeComment)
router.patch('/comment/:id/unlike', User, commentController.dislikeComment)

module.exports = router
