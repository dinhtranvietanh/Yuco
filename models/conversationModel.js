const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    text: String,
    media: Array,
    recipients: [{type: mongoose.Types.ObjectId, ref: 'user'}],
},{
    timestamps: true
})

module.exports = mongoose.model('conversation', conversationSchema)