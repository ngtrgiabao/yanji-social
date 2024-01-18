const router = require("express").Router();
const auth = require("../middleware/auth");
const adminCtrl = require("../controllers/adminCtrl");

router.get('/get_total_users' , auth, adminCtrl.getTotalUsers);
router.get("/get_total_posts", auth, adminCtrl.getTotalPosts);
router.get("/get_total_comments", auth, adminCtrl.getPostsList);
router.get("/get_total_comments", auth, adminCtrl.getUsersList);
router.get("/get_total_comments", auth, adminCtrl.deletePost);
router.get("/get_total_comments", auth, adminCtrl.deleteUser);

module.exports = router;