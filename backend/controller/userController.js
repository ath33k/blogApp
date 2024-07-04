const multer = require("multer");
const sharp = require("sharp");
const { firebaseStorage } = require("./../utils/firebaseConfig");
const { ref, uploadBytes } = require("firebase/storage");
const User = require("../model/userModel");
const catchAsyncErr = require("../utils/catchAsyncErr");
const CustomError = require("../utils/customError");

const storage = firebaseStorage();

const multerStorage = multer.memoryStorage();
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     // user-<userID><timestamp>
//     // user-ndjk77237dbka-325488
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new CustomError("please upload only image file", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("image");

exports.resizeUserPhoto = catchAsyncErr(async (req, res, next) => {
  if (!req.file) return next();

  console.log(req);
  req.file.originalname = `user-${req.user.id}-${Date.now()}.jpeg`;

  req.resized = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();
  // .toFile(`public/img/users/${req.file.originalname}`);

  next();
});

exports.getAllUser = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.getCurrentUser = catchAsyncErr(async (req, res, next) => {
  const currUser = await User.findById(req.id);

  res.status(200).json({
    status: "success",
    user: currUser,
  });
});

exports.updateMe = catchAsyncErr(async (req, res, next) => {
  console.log(req.body);
  console.log("AFTER====");
  console.log(req.resized);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new CustomError(
        "This route is not for password updates. Pelas use /updateMyPassword"
      )
    );
  }

  const filteredBody = {};
  Object.keys(req.body).forEach((el) => {
    if (["name", "email"].includes(el)) {
      filteredBody[el] = req.body[el];
    }
  });

  if (req.file) filteredBody.image = req.file.originalname;
  const imageRef = ref(storage, `user-images/${req.file.originalname}`);

  await uploadBytes(imageRef, req.resized);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
  // const filteredBody = filterO
});

exports.deleteMe = catchAsyncErr(async (req, res, next) => {
  const deletedUser = await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  if (!deletedUser) {
    return next(new CustomError("user not found"));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
