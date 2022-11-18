const router = require('express').Router()
const commentController = require('../controllers/commentController')

router.post('/comment',  commentController.createComment)
router.delete('/comment/:id', commentController.deleteCommnet)
router.patch('/comment/:id', commentController.updateComment)

module.exports = router
