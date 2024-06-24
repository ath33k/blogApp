const express = require("express");
const likeController = require("./../controller/likeController");
const authController = require("./../controller/authController");

const router = express.Router();

router
  .route("/")
  .get(likeController.getAllLikes)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    likeController.createLike
  );

router.route("/:id").get().delete();

module.exports = router;
