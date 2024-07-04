const express = require("express");
const postController = require("./../controller/postController");
const authController = require("./../controller/authController");

const router = express.Router();
// router.get("/auth", authController.checkLogin);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    postController.uploadCoverImage,
    postController.resizePhoto,
    postController.createPost
  );

router
  .route("/:id")
  .get(postController.getPost)
  .patch(authController.restrictTo("admin"), postController.updatePost)
  .delete(
    authController.protect,
    // authController.restrictTo("admin"),
    postController.deletePost
  );

module.exports = router;
