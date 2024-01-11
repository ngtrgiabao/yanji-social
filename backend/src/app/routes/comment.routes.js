const express = require("express");
const router = express.Router();

const { commentController } = require("../controllers/comment.controller");

router.get("/", (req, res) => {
  res.send({ msg: "Hello from comment :D" });
});
router.get("/all-comments", commentController.getAllComments);
router.get("/all-comments/post/:postID", commentController.getCommentsByPostId);
router.get("/all-comments/user/:userID", commentController.getCommentsByUserId);
router.get("/get-comment/:commentId", commentController.getCommentById);

router.put("/update-comment/:commentId", commentController.updateCommentById);

router.delete(
  "/delete-comment/:commentId",
  commentController.deleteCommentById,
);

module.exports = router;
