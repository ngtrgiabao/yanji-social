const PostModel = require("../models/post.model");

class CommentController {
  getAllComments = async (req, res) => {
    try {
      const posts = await PostModel.find({}).sort({ createdAt: -1 });
      const comments = posts.flatMap((post) => post.comments);

      return res.status(200).json({
        msg: "Get all comments successfully",
        length: comments.length,
        data: comments,
      });
    } catch (error) {
      console.error(`Error retrieving comments: ${error}`);

      return res.status(500).json({
        msg: `Error retrieving comments: ${error}`,
      });
    }
  };

  getCommentById = async (req, res) => {
    const { commentId } = req.params;

    try {
      const post = await PostModel.findOne({ "comments._id": commentId });
      if (!post) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }

      const comment = post.comments.find((c) => c._id.toString() === commentId);
      if (!comment) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }

      return res.status(200).json({
        msg: "Get comment successfully",
        data: comment,
        postID: post._id,
      });
    } catch (error) {
      console.error(`Error retrieving comment: ${error}`);

      return res.status(500).json({
        msg: `Error retrieving comment: ${error}`,
      });
    }
  };

  deleteCommentById = async (req, res) => {
    const { commentId } = req.params;

    try {
      const post = await PostModel.findOne({ "comments._id": commentId });
      if (!post) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }

      const comment = post.comments.find((c) => c._id.toString() === commentId);
      if (!comment) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }

      const deletedComment = comment.toObject();
      post.comments.pull({ _id: comment._id });
      await post.save();

      return res.status(200).json({
        msg: "Comment deleted successfully",
        postID: post._id,
        comment: deletedComment,
      });
    } catch (error) {
      console.error(`Error deleting comment: ${error}`);

      return res.status(500).json({
        msg: `Error deleting comment: ${error}`,
      });
    }
  };

  updateCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
      const post = await PostModel.findOne({ "comments._id": commentId });
      if (!post) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }

      const comment = post.comments.find((c) => c._id.toString() === commentId);
      if (!comment) {
        return res.status(404).json({
          msg: "Comment not found",
        });
      }

      comment.content = content;
      await post.save();

      return res.status(200).json({
        msg: "Comment updated successfully",
        postID: post._id,
        comment,
      });
    } catch (error) {
      console.error(`Error updating comment: ${error}`);

      return res.status(500).json({
        msg: `Error updating comment: ${error}`,
      });
    }
  };

  getCommentsByPostId = async (req, res) => {
    const { postID } = req.params;

    try {
      const post = await PostModel.findById(postID);
      if (!post) {
        return res.status(404).json({
          msg: "Post not found",
        });
      }

      const comments = post.comments.sort((a, b) => b.createdAt - a.createdAt);

      return res.status(200).json({
        msg: "Get comments by post ID successfully",
        postID: post._id,
        comments,
      });
    } catch (error) {
      console.error(`Error retrieving comments: ${error}`);

      return res.status(500).json({
        msg: `Error retrieving comments: ${error}`,
      });
    }
  };

  getCommentsByUserId = async (req, res) => {
    const { userID } = req.params;

    try {
      const posts = await PostModel.find({ "comments.userID": userID });
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          msg: "No posts found for the specified user",
        });
      }

      const userComments = posts.map((post) => {
        const filteredComments = post.comments.filter(
          (comment) => comment.userID === userID,
        );
        return {
          postID: post._id,
          comments: filteredComments,
        };
      });

      return res.status(200).json({
        msg: "Get comments by userID successfully",
        userComments,
      });
    } catch (error) {
      console.error(`Error retrieving comments: ${error}`);

      return res.status(500).json({
        msg: `Error retrieving comments: ${error}`,
      });
    }
  };
}

const commentController = new CommentController();

module.exports = {
  commentController,
};
