const User = require("../model/user");
const catchAsyncErr = require("../utils/catchAsyncErr");
const { promisify } = require("util");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenAndResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token);

  user.password = undefined;

  res.status(201).json({
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsyncErr(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  sendTokenAndResponse(newUser, 201, res);
});

exports.login = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password exist
  if (!email || !password) {
    return next(new CustomError("Please provide email and password!", 400));
  }

  // Check if the user exist && password correct
  // password is unselected from the db response, so we have to select explicitly
  const user = await User.findOne({ email }).select("+password");

  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new CustomError("Incorrect email or password", 401));
  }

  // If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsyncErr(async (req, res, next) => {
  // check token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new CustomError(" You are not logged In! Pelase log into get access")
    );
  }

  // token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  next();
});
