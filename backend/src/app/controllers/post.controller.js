const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { imageController } = require("./image.controller");
const { videoController } = require("./video.controller");

class PostController {
  uploadPost = async (req, res) => {
    try {
      const { userID, desc, img, video } = req.body;
      const newPost = await PostModel.create({
        userID,
        desc,
        img,
        video,
      });

      if (img) {
        imageController.uploadImageByUserID(userID, img);
      }
      if (video) {
        videoController.uploadVideoByUserID(userID, video);
      }

      console.log(newPost);

      return res.status(200).json({
        msg: `Post upload successfully`,
        data: newPost,
      });
    } catch (error) {
      console.error("Failed to upload post", error);
      return res.status(500).json({
        msg: "Failed to upload post",
        error,
      });
    }
  };

  deletePost = async (req, res) => {
    const postID = req.params.postID;

    const result = await PostModel.findById(postID);
    const image = result.img;
    const video = result.video;

    if (image) {
      await imageController.deleteImageByID(image);
    }
    if (video) {
      await videoController.deleteVideoByID(video);
    }

    await PostModel.findByIdAndDelete(postID);

    return res.status(200).json({
      msg: "Post deleted successfully",
      data: result,
    });
  };

  getAllPostsByUser = async (req, res) => {
    const userID = req.params.userID;

    try {
      const posts = await PostModel.find({
        userID: userID,
      }).sort({ createdAt: -1 });
      const countPosts = await PostModel.countDocuments();

      return res.status(200).json({
        msg: `Get all posts successfully of user: ${userID}`,
        length: countPosts,
        posts: posts,
      });
    } catch (error) {
      console.error(`Error retrieving posts of user ${userID}: ${error}`);

      return res.status(500).json({
        msg: `Error retrieving posts of user ${userID}: ${error}`,
      });
    }
  };

  getAllPosts = async (req, res) => {
    try {
      const { limit, skip } = req.query;
      const posts =
        limit || skip
          ? await PostModel.find({})
              .sort({ createdAt: -1 })
              .limit(limit)
              .skip(skip)
          : await PostModel.find({}).sort({ createdAt: -1 });

      const countPosts = await PostModel.countDocuments();
      return res.status(200).json({
        msg: "Get all posts successfully",
        length: countPosts,
        posts,
      });
    } catch (error) {
      console.error(`Error retrieving posts: ${error}`);

      return res.status(500).json({
        msg: `Error retrieving posts: ${error}`,
      });
    }
  };

  deleteAllPostsByUser = async (req, res) => {
    const userID = req.params.userID;

    try {
      const length = await PostModel.countDocuments();

      if (length <= 0) {
        console.error("Nothing to delete");

        return res.status(400).json({
          msg: "Nothing to delete",
        });
      }

      const result = await PostModel.deleteMany({ userID });

      return res.status(200).json({
        msg: `Delete all posts of user: ${userID} success`,
        count: result.deletedCount,
      });
    } catch (error) {
      console.error(
        `An error occurred while deleting all posts of user: ${userID}`,
        error,
      );
      return res.status(500).json({
        msg: `An error occurred while deleting all posts of user: ${userID}`,
      });
    }
  };

  getPostByID = async (req, res) => {
    const postID = req.params.postID;
    const post = await PostModel.findById(postID);

    return res.status(200).json({
      msg: `Get post ${postID} successfully`,
      data: post,
    });
  };

  updatePost = async (req, res) => {
    const postID = req.params.postID;

    try {
      const { desc, img, video, userID } = req.body;
      const post = await PostModel.findById(postID);

      if (userID) {
        console.error("You can't change userID of this post!");

        return res.status(404).json({
          msg: "You can't change userID of this post!",
        });
      }
      if ((desc && desc.length > 0) || img || video) {
        post.desc = desc || post.desc;
        if (img === null) {
          post.img = "";
        } else {
          post.img = img || post.img;
        }

        post.video = video || post.video;

        const updatedPost = await post.save();

        return res.status(200).json({
          msg: "Updated post successfully",
          data: updatedPost,
        });
      }

      return res.status(200).json({
        msg: "Saved post",
      });
    } catch (error) {
      console.error("Failed to update post", error);
      return res.status(500).json({
        msg: "Failed to update post",
      });
    }
  };

  likePost = async (req, res) => {
    const postID = req.params.postID;

    try {
      const { userID } = req.body;
      const post = await PostModel.findById(postID);

      if (!post.likes.includes(userID)) {
        const updatedPost = await PostModel.findOneAndUpdate(
          { _id: postID },
          { $push: { likes: userID } },
          { new: true }, // Returns the updated post
        );

        return res.status(200).json({
          msg: "The post has been liked",
          data: updatedPost,
          isLiked: true,
        });
      } else {
        const updatedPost = await PostModel.findOneAndUpdate(
          { _id: postID },
          { $pull: { likes: userID } },
          { new: true }, // Returns the updated post
        );

        return res.status(200).json({
          msg: "The post has been disliked",
          data: updatedPost,
          isLiked: false,
        });
      }
    } catch (error) {
      console.error(`Failed to action post ${postID}`, error);
      return res.status(500).json({
        msg: `Failed to action post ${postID}`,
        error,
      });
    }
  };

  sharePost = async (req, res) => {
    const postID = req.params.postID;
    const { userID } = req.body;

    try {
      const user = await UserModel.findOne({ _id: userID });

      const sharedIndex = user.postShared.findIndex(
        (item) => item.postID === postID,
      );

      if (sharedIndex === -1) {
        // Post is not shared by the user, add it to the shared posts
        user.postShared.push({ postID });
        await user.save();

        const updatedPost = await PostModel.findOneAndUpdate(
          { _id: postID },
          { $push: { shares: userID } },
          { new: true }, // Returns the updated post
        );

        return res.status(200).json({
          msg: "The post has been shared",
          data: updatedPost,
          isShared: true,
        });
      } else {
        // Post is already shared by the user, remove it from the shared posts
        user.postShared.splice(sharedIndex, 1);
        await user.save();

        const updatedPost = await PostModel.findOneAndUpdate(
          { _id: postID },
          { $pull: { shares: userID } },
          { new: true }, // Returns the updated post
        );

        return res.status(200).json({
          msg: "The post has been unshared",
          data: updatedPost,
          isShared: false,
        });
      }
    } catch (error) {
      console.error(`Failed to share/unshare post ${postID}`, error);
      return res.status(500).json({
        msg: `Failed to share/unshare post ${postID}`,
        error,
      });
    }
  };

  commentPost = async (req, res) => {
    const postID = req.params.postID;

    try {
      const { userID, content } = req.body;
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postID },
        { $push: { comments: { userID, content } } },
        { new: true }, // Returns the updated post
      );

      return res.status(200).json({
        msg: "The post has been commented",
        data: updatedPost,
      });
    } catch (error) {
      console.error(`Failed to comment post ${postID}`, error);
      return res.status(500).json({
        msg: `Failed to comment post ${postID}`,
        error,
      });
    }
  };
}

const postController = new PostController();

module.exports = {
  postController,
};
