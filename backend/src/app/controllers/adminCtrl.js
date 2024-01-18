const Posts = require("../models/post.model");
const Users = require("../models/user.model");
const { post } = require("../routes/adminRoutes");


const adminCtrl = {
  //Xem danh sách người dùng
  getUsersList: async (req, res) => {
    try {
      const users = await Users.find();
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }, 

  //Xem danh sách bài viết
  getPostsList: async (req, res) => {
    try {
      const posts = await Posts.find();
      res.json({ posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Tính tổng người dùng
  getTotalUsers: async (req, res) => {
    try {
      const users = await Users.find();
      const total_users = users.length;
      res.json({ total_users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Tính tổng bài viết
  getTotalPosts: async (req, res) => {
    try {
      const posts = await Posts.find();
      const total_posts = posts.length;
      res.json({ total_posts });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Xóa người dùng
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      // Kiểm tra người dùng có tồn tại không
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'Người dùng không tồn tại' });
      }

      // Xóa người dùng
      await Users.findByIdAndDelete(userId);

      res.json({ msg: 'Người dùng đã được xóa thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
    },

  //Xóa bài viết
  deletePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      // Kiểm tra bài viết có tồn tại không
      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: 'Bài viết không tồn tại' });
      }

      // Xóa bài viết
      await Posts.findByIdAndDelete(postId);

      res.json({ msg: 'Bài viết đã được xóa thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
      }
    },
};
module.exports = adminCtrl;