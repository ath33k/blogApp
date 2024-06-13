const express = require("express");
const postController = require("./../controller/postController");

const router = express.Router();

router.route("/").get(postController.getAllPosts).post();

router.route("/:id").get();

module.exports = router;
