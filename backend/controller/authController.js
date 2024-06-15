const User = require("../model/user");
const catchAsyncErr = require("../utils/catchAsyncErr");
const { promisify } = require("util");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

// Creating jwt with user id and the secret
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// sends response and the cookie token
const sendTokenAndResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // only communicate through https when in production environment
  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;

  // Cookie name, value as the token, options
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(201).json({
    token,
    data: {
      user,
    },
  });
};

// user sign up function
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

// user Login funciton
exports.login = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password exist
  if (!email || !password) {
    return next(new CustomError("Please provide email and password!", 400));
  }

  // Check if the user exist && password correct
  // password is unselected from the db response, so we have to select explicitly
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new CustomError("user not found", 404));
  console.log(user);

  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new CustomError("Incorrect email or password", 401));
  }

  // If everything ok, send token to client
  const token = signToken(user._id);
  sendTokenAndResponse(user, 200, res);
});

// Protects routes with this function
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

  // check user still exists
  // use case: user changed the passsword after the token generation
  // so we have to change the token by login in again
  const freshUser = await User.findById(decoded.id);
  if (freshUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new CustomError("User recently changed password! Please login again", 401)
    );
  }

  // assigning the usser to request so other routes can access user
  req.user = freshUser;
  next();
});
