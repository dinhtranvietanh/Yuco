const Posts = require('../models/postModel')

const PostController = {
    async createPost (req, res, next) {
        try {
            if(!req.body.image){
                throw new Error('Please input your image')
            }
            if(!req.body.title){
                throw new Error('Please input your title')
            }

            let newPost={
                title: req.body.title,                
                images: req.body.image,
                message: req.body.message,
                creator:req.user.name, 
                userId:req.user.id
            }
            const newPosts = new Posts(newPost)
            await newPosts.save()

            res.send({status: true, data: newPosts})

        } catch (error) {
            next(error)
        }
    }
}
exports.module = PostController