const multer = require("multer");
const sharp = require("sharp");
const { firebaseStorage } = require("./../utils/firebaseConfig");
const { ref, uploadBytes } = require("firebase/storage");
const catchAsyncErr = require("../utils/catchAsyncErr");
const CustomError = require("./../utils/customError");
const APIFeatures = require("./../utils/apiFeatures");
const Post = require("../model/postsModel");

const storage = firebaseStorage();

const multerStorage = multer.memoryStorage();

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

exports.uploadCoverImage = upload.single("coverImage");

exports.resizePhoto = catchAsyncErr(async (req, res, next) => {
  if (!req.file) return next();

  req.file.originalname = `user-${req.user.id}-${Date.now()}.jpeg`;

  req.resized = await sharp(req.file.buffer)
    .resize(1024, 768)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  next();
});

exports.getAllPosts = catchAsyncErr(async (req, res, next) => {
  try {
    let posts;
    if (req.query.random) {
      posts = await Post.aggregate([
        { $sample: { size: req.query.random * 1 } },
      ]);

      await Post.populate(posts, { path: "category" });

      res.status(200).json({
        status: "success",
        results: posts.length,
        data: posts,
      });
    } else {
      const features = new APIFeatures(Post.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      posts = await features.query;

      const count = await Post.find().countDocuments();
      console.log(count);
      res.status(200).json({
        status: "success",
        results: posts.length,
        data: posts,
        totalPages: Math.ceil(count / (req.query.limit || 5)),
      });
    }
  } catch (err) {
    next(err);
  }
});

exports.getPost = catchAsyncErr(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("likes");
  // .populate("category");

  if (!post) {
    return next(new CustomError(`Post not found`, 404));
  }
  console.log(req.user);
  res.status(200).json({
    status: "success",
    data: post,
    // likeCount: post.likeCount,
  });
});

exports.createPost = catchAsyncErr(async (req, res, next) => {
  const newPost = await Post.create({
    heading: req.body.heading,
    content: req.body.content,
    description: req.body.description,
    category: req.body.category,
    coverImage: req.file.originalname,
  });

  console.log("errrrr");

  const imageRef = ref(storage, `cover-images/${req.file.originalname}`);

  await uploadBytes(imageRef, req.resized);

  res.status(201).json({
    status: "success",
    data: newPost,
  });
});

exports.updatePost = catchAsyncErr(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      content: req.body.content,
      description: req.body.description,
      $push: { category: req.body.category },
      // category: req.body.category,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!post) {
    return next(new CustomError("Couldn't update", 500));
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.deletePost = catchAsyncErr(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  if (!deletedPost) {
    return next(new CustomError("Couldn't delete post not found", 401));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
