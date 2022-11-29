const router = require('express').Router()
const chatController = require('../controllers/chatController')
const User = require('../middleware/user')

router.post('/chat', User, chatController.createChat)
router.get('/conversation', User, chatController.getUserConversation)
router.get('/chat/:id', User, chatController.getChat)
router.delete('/chat/:id', User, chatController.deleteChat)
router.delete('/conversation/:id', User, chatController.deleteConversation)

module.exports = router