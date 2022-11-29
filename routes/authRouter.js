const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')
const User = require('../middleware/user')


router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.post('/logout', authCtrl.logout)
router.post('/refresh_token', authCtrl.generateAccessToken)
router.post('/forget', authCtrl.forgetPassword)
router.post('/reset', authCtrl.resetPassword)
router.get('/user/:id', authCtrl.getAuthUser)
router.get('/search_user', User, authCtrl.searchUser)

module.exports = router