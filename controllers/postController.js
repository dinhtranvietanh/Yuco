const Posts = require("../models/postModel");

const PostController = {
  async getPosts(req, res, next) {
    try {
      const postsArr = await Posts.find()
        .sort("-createdAt")
        .populate("user", "avatar username")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        })
      res.send({ success: true, data: postsArr });
    } catch (error) {
      next(error);
    }
  },

  async createPost(req, res, next) {
    try {
      if (!req.body.images) {
        throw new Error("Please input your image");
      }
      if (!req.body.title) {
        throw new Error("Please input your title");
      }

      let newPost = {
        title: req.body.title,
        images: req.body.images,
        message: req.body.message,
        creator: req.user.username,
        userId: req.user.id,
        tags: req.user.tags
      };

      const newPosts = new Posts(newPost);
      await newPosts.save();

      res.send({ success: true, data: newPosts });
    } catch (error) {
      next(error);
    }
  },
  async updatePost(req, res, next) {
    try {
      const ObjectId = require("mongoose").Types.ObjectId;
      const { id } = req.params;

      const new_data = {
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator,
        images: req.body.images,
        tags: req.body.tags,
        _id: id,
      };

      if (!ObjectId.isValid(id)) {
        throw new Error(`Can't find posts with id: ${id} `);
      }

      const updatePost = await Posts.findByIdAndUpdate(id, new_data)
        .populate("user likes", "avatar name")
        // .populate({
        //   path: "comment",
        //   populate: {
        //     path: "user likes",
        //     select: "comment",
        //   },
        // });

      res.send({ success: true, updatePost: {
        ...updatePost._doc,
        ...new_data
    } });
    } catch (error) {
      next(error);
    }
  },

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;

      await Posts.findOneAndDelete({ _id: id, post: req.user._id });

      res.send({ success: true, message: "Post deleted successfully." });
    } catch (error) {
      next(error);
    }
  },

  async likePost(req, res, next) {
    try {
      const { id } = req.params;

      const post = await Posts.find({ _id: id, likes: req.user._id });
      if (post.length > 0) res.send({ message: "like this post" });
      const like = await Posts.findByIdAndUpdate(
        { _id: id },
        { $push: { likes: req.user._id } },
        { new: true }
      );

      if (!like) return res.send({ message: "Post does not exist" });
      res.send({ message: "Liked post" });
    } catch (error) {
      next(error);
    }
  },
  async unLikePost(req, res, next) {
    try {
      const { id } = req.params;

      console.log(id)
      const like = await Posts.findOneAndUpdate(
        { _id: id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like) res.send({ message: "This post does not exist." });

      res.send({ message: "UnLiked Post!" });
    } catch (error) {
      next(error);
    }
  },

  getDetailPost: async (req, res, next) => {
    try {
      const getDetailPost = await Posts.findById(req.params.id)
        .populate("user", "avatar username")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "-password",
          },
        });

      res.send({ getDetailPost });
    } catch (err) {
      next(err);
    }
  },
  getUserPost: async (req, res, next) => {
    try {
      const userPost = await Posts.find({ user: req.params.id }).sort(
        "-createAt"
      );

      res.send({
        userPost,
        result: userPost.length,
      });
    } catch (err) {
      next(err)
    }
  },
};
module.exports = PostController;
