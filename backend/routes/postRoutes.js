const express = require("express");
const postController = require("./../controller/postController");
const authController = require("./../controller/authController");

const router = express.Router();
// router.use(authController.isLoggedIn);
// router.get("/auth", authController.checkLogin);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(authController.restrictTo("admin"), postController.deletePost);

module.exports = router;
