const router = require('express').Router()
const chatController = require('../controllers/chatController')
const User = require('../middleware/user')

router.post('/chat', User, chatController.createChat)

module.exports = router