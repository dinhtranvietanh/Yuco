const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    text: String,
    media: Array,
    recipient: {type: mongoose.Types.ObjectId, ref: 'user'},
    conversation: {type: mongoose.Types.ObjectId, ref: 'conversation'},
    sender: {type: mongoose.Types.ObjectId, ref: 'user'},
},{
    timestamps: true
})

module.exports = mongoose.model('chat', chatSchema)