const Posts = require('../models/postModel')

const PostController = {
    async getPosts (req, res, next) {
        try {
            const postsArr = await Posts.find(req.user._id).sort('-createdAt')
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })
            .populate("user likes","avatar name");

            res.send({success: true, data: postsArr})
        } catch (error) {
            next(error)
        }
    },
    
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

            res.send({success: true, data: newPosts})

        } catch (error) {
            next(error)
        }
    }
}
exports.module = PostController