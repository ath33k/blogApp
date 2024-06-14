const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "A post must have a heading"],
  },
  content: {
    type: String,
    required: [true, "A post must have a content"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
