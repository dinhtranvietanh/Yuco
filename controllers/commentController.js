const Comment = require("../models/commentModel");

const Posts = require("../models/postModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content } = req.body;
      console.log(req.body)

      const post = await Posts.findById(postId);
      if (!post) res.send(message);

      const newComment = new Comment({
        user: req.user._id,
        content,
        postId,
      });
      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { Comment: newComment.id },
        },
        { new: true }
      );

      await newComment.save();
      res.send({ newComment });
    } catch (error) {
      res.send({ message: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comment.findOneAndUpdate(
        { _id: req.param.id, user: req.user._id },
        { content }
      );

      res.send({ message: "updated" });
    } catch (error) {
      res.send({ message: error.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comment.find({
        _id: req.param.id,
        likes: req.user.id,
      });

      if (comment.length > 0) res.send({ message: "liked" });

      await Comment.findOneAndUpdate(
        { _id: req.param.id },
        { $push: { likes: req.user.id } },
        { new: true }
      );
    } catch (error) {
      res.send({ message: error.message });
    }
  },
  dislikeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.param.id },
        { $pull: { likes: req.param._id } },
        { new: true }
      );
    } catch (error) {
      res.send({ message: error.message });
    }
  },
  deleteCommnet: async (req, res) => {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: param.id,
        $or: [{ user: req.user.id }, { postUserId: req.user.id }],
      });

      await Posts.findOneAndUpdate(
        { _id: comment.postId },
        { $pull: { comments: req.param.id } }
      );

      res.send({ message: "Deleted" });
    } catch (error) {
      res.send({ message: error.message });
    }
  },
};

module.exports = commentCtrl;
