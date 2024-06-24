const Like = require("../model/likeModel");
const catchAsyncErr = require("../utils/catchAsyncErr");
const CustomError = require("../utils/customError");

exports.getAllLikes = catchAsyncErr(async (req, res, next) => {
  const likes = await Like.find();
  if (!likes) {
    return next(new CustomError("There are no likes found", 404));
  }

  res.status(200).json({
    status: "success",
    results: likes.length,
    data: {
      likes: likes,
    },
  });
});

exports.getLike = catchAsyncErr(async (req, res, next) => {
  const like = await Like.find(req.params.id);

  if (!like) {
    return next(new CustomError("Like not found"));
  }
  res.status(200).json({
    status: "success",
    like,
  });
});

exports.createLike = catchAsyncErr(async (req, res, next) => {
  const newLike = await Like.create(req.body);

  if (!newLike) {
    return next(new CustomError("Error occured when creating a like", 500));
  }

  res.status(201).json({
    status: "success",
    data: {
      like: newLike,
    },
  });
});

exports.deleteLike = catchAsyncErr(async (req, res, next) => {
  const deleteLike = await Like.findByIdAndDelete(req.params.id);

  if (!deleteLike) {
    return next(new CustomError("Couldn't found like id", 401));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
