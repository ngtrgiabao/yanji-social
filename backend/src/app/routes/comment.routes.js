const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment.controller");

router.get("/all-comments", CommentController.getAllComments);
router.get("/all-comments/post/:postID", CommentController.getCommentsByPostId);
router.get("/all-comments/user/:userID", CommentController.getCommentsByUserId);
router.get("/get-comment/:commentId", CommentController.getCommentById);

router.put("/update-comment/:commentId", CommentController.updateCommentById);

router.delete(
  "/delete-comment/:commentId",
  CommentController.deleteCommentById,
);

module.exports = router;
