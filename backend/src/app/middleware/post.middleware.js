const Post = require("../models/post.model");

const validatePostID = async (req, res, next) => {
  const postID = req.params.postID;

  try {
    const result = await Post.findById(postID);

    if (!result) {
      console.error("Post not found!, please check your post ID");
      return res.status(404).json({
        msg: "Post not found, please check your post ID",
      });
    }

    next();
  } catch (error) {
    console.error(`An error occurred while validate post ID: ${error}`);
    return res.status(500).json({
      msg: `An error occurred while validate post ID: ${error}`,
    });
  }
};

module.exports = {
  validatePostID,
};
