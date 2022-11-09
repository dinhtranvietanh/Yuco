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
    },
    async updatePost (req, res, next) {
        try {
            const ObjectId = require('mongoose').Types.ObjectId
            const {id} = req.params

            const new_data = {
                title: req.body.title, 
                message: req.body.message, 
                creator: req.body.creator, 
                images: req.body.images, 
                _id: id
            }

            if (!ObjectId.isValid(id)){
                throw new Error(`Can't find posts with id: ${id} `)
            }

            await Posts.findByIdAndUpdate(id, new_data)
            .populate("user likes", "avatar name")
            .populate({
                path: "comment",
                populate: {
                    path: "user likes",
                    select: "comment"
                }
            })

            res.send({success: true, data: new_data})

        } catch (error) {
            next(error)
        }
    },

    async deletePost (req, res, next) {
        try {
            const {id} = req.params
          
            await Posts.findOneAndDelete({_id: id, post: req.user._id});
        
            res.send({ success: true, message: "Post deleted successfully." });
        } catch (error) {
            next(error)
        }
    },

    async likePost (req, res, next) {
        try {
            
            const post = await PostMessage.find({_id: id, likes: req.user._id})
             if (post.length> 0)
             res.send({message: "like this post"})
             const like = await PostMessage.findByIdAndUpdate({_id: id}, {$push: {likes: req.user._id},},{new: true})

             if(!like) return res.send({message: "Post does not exist"})
              res.send({message: "Liked post"})
        } catch (error) {
            res.send({message: error.message})
            
        }
    },
    async unLikePost (req,res, next) {
        try{
    const like = await PostMessage.findOneAndUpdate({_id: id, likes:req.user._id}, {
        $pull: {likes: req.user._id}
    }, {new: true})

    if(!like)  res.send({message: "This post does not exist."})

    res.send({message: "UnLiked Post!"})

} catch (error) {
     res.send({message: error.message})
}

        
    },
}
module.exports = PostController