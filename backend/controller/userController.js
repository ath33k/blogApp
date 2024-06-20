const User = require("../model/userModel");
const catchAsyncErr = require("../utils/catchAsyncErr");
const CustomError = require("../utils/customError");

exports.getAllUser = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.deleteUser = catchAsyncErr(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return next(new CustomError("user not found"));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
