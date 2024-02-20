const router = require("express").Router();
const auth = require("../middleware/auth");
const AdminController = require("../controllers/admin.controller");

router.get('/get_total_users' , auth, AdminController.getTotalUsers);
router.get("/get_total_posts", auth, AdminController.getTotalPosts);
router.get("/get_total_comments", auth, AdminController.getPostsList);
router.get("/get_total_comments", auth, AdminController.getUsersList);
router.get("/get_total_comments", auth, AdminController.deletePost);
router.get("/get_total_comments", auth, AdminController.deleteUser);

module.exports = router;