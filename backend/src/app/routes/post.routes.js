const express = require("express");
const router = express.Router();

const { postController } = require("../controllers/post.controller");

const PostMiddleware = require("../middleware/post.middleware");
const { userMiddleware } = require("../middleware/user.middleware");

router.get("/", (req, res) => {
  res.send({
    msg: "Hello from post :D",
  });
});
router.get(
  "/all-posts/author/:userID",
  userMiddleware.validateUserById,
  postController.getAllPostsByUser,
);
router.get(
  "/get-post/:postID",
  PostMiddleware.validatePostID,
  postController.getPostByID,
);
router.get("/all-posts", postController.getAllPosts);

router.post(
  "/upload-post/:userID",
  userMiddleware.validateUserById,
  postController.uploadPost,
);

router.put(
  "/update-post/:postID",
  PostMiddleware.validatePostID,
  postController.updatePost,
);
router.put(
  "/:postID/like",
  PostMiddleware.validatePostID,
  postController.likePost,
);
router.put(
  "/:postID/share",
  PostMiddleware.validatePostID,
  postController.sharePost,
);
router.put(
  "/:postID/comment",
  PostMiddleware.validatePostID,
  postController.commentPost,
);

router.delete(
  "/delete-post/:postID",
  PostMiddleware.validatePostID,
  postController.deletePost,
);
router.delete(
  "/delete-all/author/:userID",
  userMiddleware.validateUserById,
  postController.deleteAllPostsByUser,
);

module.exports = router;
