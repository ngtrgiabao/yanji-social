const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post.controller");

const PostMiddleware = require("../middleware/post.middleware");
const UserMiddleware = require("../middleware/user.middleware");

router.get("/", (req, res) => {
    res.send({
        msg: "Hello from post :D",
    });
});
router.get(
    "/all-posts/author/:userID",
    UserMiddleware.validateUserById,
    PostController.getAllPostsByUser
);
router.get(
    "/get-post/:postID",
    PostMiddleware.validatePostID,
    PostController.getPostByID
);

router.post(
    "/upload-post/:userID",
    UserMiddleware.validateUserById,
    PostController.uploadPost
);

router.put(
    "/update-post/:postID",
    PostMiddleware.validatePostID,
    PostController.updatePost
);
router.put(
    "/:postID/like",
    PostMiddleware.validatePostID,
    PostController.likePost
);
router.put(
    "/:postID/share",
    PostMiddleware.validatePostID,
    PostController.sharePost
);
router.put(
    "/:postID/comment",
    PostMiddleware.validatePostID,
    PostController.commentPost
);

router.delete(
    "/delete-post/:postID",
    PostMiddleware.validatePostID,
    PostController.deletePost
);
router.delete(
    "/delete-all/author/:userID",
    UserMiddleware.validateUserById,
    PostController.deleteAllPostsByUser
);

module.exports = router;
