const Posts = require("../models/post.model");
const Users = require("../models/user.model");

class AdminController {
  // View user list
  static async getUsersList(req, res) {
    try {
      const users = await Users.find();
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  // See article list
  static async getPostsList(req, res) {
    try {
      const posts = await Posts.find();
      res.json({ posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  // Calculate the total number of users
  static async getTotalUsers(req, res) {
    try {
      const users = await Users.find();
      const total_users = users.length;
      res.json({ total_users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  // Calculate total number of posts
  static async getTotalPosts(req, res) {
    try {
      const posts = await Posts.find();
      const total_posts = posts.length;
      res.json({ total_posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  // Delete users
  static async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      // Check if the user exists
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User does not exist' });
      }

      // Delete user
      await Users.findByIdAndDelete(userId);

      res.json({ msg: 'The user has been successfully deleted' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  // Delete posts
  static async deletePost(req, res) {
    try {
      const postId = req.params.postId;
      // Check if the post exists
      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: 'The article does not exist' });
      }

      // Delete post
      await Posts.findByIdAndDelete(postId);

      res.json({ msg: 'The post has been successfully deleted' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = AdminController;
