const asyncWrapper = require("../utils/asyncMiddlewareWrapper");
const CustomError = require("./../utils/customError");
const Post = require("./../model/posts");

exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts,
  });
};

exports.getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({
    data: post,
  });
};

exports.createPost = async (req, res, next) => {
  const newPost = await Post.create({
    heading: req.body.heading,
    content: req.body.content,
    createdAt: req.body.createdAt,
  });

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
};

exports.deletePost = asyncWrapper(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  if (!deletedPost) {
    return next(new CustomError("Couldn't delete post not found", 401));
    // res.status(404).json({
    //   status: "fail",
    //   data: "User Not found",
    // });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
