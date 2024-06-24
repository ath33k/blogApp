const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "A post must have a heading"],
    },
    content: {
      type: String,
      required: [true, "A post must have a content"],
    },
    category: {
      type: String,
      required: [true, "A post should have a category"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Foreign field means FK in the 'Likes' which belong to 'Post'
 * localField means PK in the 'Post'
 */
postsSchema.virtual("likes", {
  ref: "Like",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
