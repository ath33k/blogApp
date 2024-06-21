const multer = require("multer");
const User = require("../model/userModel");
const catchAsyncErr = require("../utils/catchAsyncErr");
const CustomError = require("../utils/customError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    // user-<userID><timestamp>
    // user-ndjk77237dbka-325488
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new CustomError("NOt an image please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.getAllUser = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.uploadUserPhoto = upload.single("photo");

exports.getCurrentUser = catchAsyncErr(async (req, res, next) => {
  const currUser = await User.findById(req.id);

  res.status(200).json({
    status: "success",
    user: currUser,
  });
});

exports.updateMe = catchAsyncErr(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  console.log(req.user);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new CustomError(
        "This route is not for password updates. Pelas use /updateMyPassword"
      )
    );
  }
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
