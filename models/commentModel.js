const mongoose = require('mongoose')
const { likePost } = require('../controllers/postController')

const comment_schema = new mongoose.Schema({
    content: {
        type: String, require: true
    
},

likes:  [{type: mongoose.Types.ObjectId, ref: 'user'}],
user: {type: mongoose.Types.ObjectId, ref: 'user'},
reply: mongoose.Types.ObjectId,
postID: mongoose.Types.ObjectId,
postUserId: mongoose.Types.ObjectId

}, {timestamp: true})

module.exports = mongoose.model('comment',comment_schema
)