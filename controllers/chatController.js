const Chat = require('../models/chatModel')
const Conversation = require('../models/conversationModel')

const ChatCtrl = {
    createChat: async (req, res, next) => {
        try {
            const {recipient, text, media} = req.body
            
            if(!recipient || (!text.trim() && media.length === 0)) return

            const newConversation = await Conversation.findOneAndUpdate({
                $or: [
                    {recipients: [req.user._id, recipient]},
                    {recipients: [recipient, req.user._id]}
                ]
            },{
                recipients: [req.user._id, recipient],
                text,media
            }, {new: true, upsert: true})

            const newChat = new Chat({
                conversation: newConversation._id,
                sender: req.user._id,
                recipient, text, media
            })

            await newChat.save()

            res.send({msg: "Created new chat"})
            
        } catch (err) {
            next(err)
        }
    },
}

module.exports = ChatCtrl