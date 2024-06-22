const User = require("../model/userModel");
const crypto = require("crypto");
const catchAsyncErr = require("../utils/catchAsyncErr");
const { promisify } = require("util");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const Email = require("../utils/email");

// Creating jwt with user id and the secret
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// sends response and the cookie token
const sendTokenAndResponse = (user, statusCode, res) => {
  const token = signToken(user._id);
  console.log(token, "tokenn");

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
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  console.log(url);
  try {
    await new Email(newUser, url).sendWelcome();
  } catch (err) {
    console.log("error while sending email");
  }

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
  // const token = signToken(user._id);
  sendTokenAndResponse(user, 200, res);
});

// Protects routes with this function
exports.protect = catchAsyncErr(async (req, res, next) => {
  // check token
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  const token = req.cookies.jwt;

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
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new CustomError(
        "The user belonging to this token does no longer exists",
        401
      )
    );
  }

  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new CustomError("User recently changed password! Please login again", 401)
    );
  }

  // assigning the usser to request so other routes can access user
  req.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // token verification
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);
      // check user still exists
      // use case: user changed the passsword after the token generation
      // so we have to change the token by login in again
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      if (currentUser.passwordChangedAfter(decoded.iat)) {
        return next();
      }

      // assigning the usser to request so other routes can access user
      req.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.checkLogin = catchAsyncErr(async (req, res, next) => {
  const token = req.cookies.jwt;

  console.log(token, "what");

  if (!token) {
    return next(
      new CustomError(" You are not logged In! Pelase log into get access", 401)
    );
  }

  // token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // check user still exists
  // use case: user changed the passsword after the token generation
  // so we have to change the token by login in again
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new CustomError(
        "The user belonging to this token does no longer exists",
        401
      )
    );
  }

  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new CustomError("User recently changed password! Please login again", 401)
    );
  }

  // assigning the usser to request so other routes can access user

  res.status(200).json({
    status: "success",
    user: currentUser,
  });
});

exports.restrictTo = (...roles) => {
  // roles ['admin,'lead-guide']. role='user'
  // req.user is coming from previous middleware (protect) which ran and before this middleware
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError(
          "you do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsyncErr(async (req, res, next) => {
  // 1) GET USE BASED ON POSTED EMAIL
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new CustomError("Thee is no user wit that email address", 404));
  }
  // 2) GENERATE RANODM TOKEN
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // const resetURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/users/resetPassword/${resetToken}`;
  // const resetURL = `/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password?  Please click the reset button below \n If you didnt fogot your password please ignore this email`;

  res.status(200).json({
    status: "success",
    resetData: {
      resetToken,
      message,
    },
  });
  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: "Your password reset token (Valid for 10 min)",
  //     message,
  //   });

  //   res.status(200).json({
  //     status: "success",
  //     message: "Token sent to email",
  //   });
  // } catch (err) {
  //   user.passwordResetToken = undefined;
  //   user.passwordResetExpires = undefined;
  //   user.save({ validateBeforeSave: false });
  //   return next(
  //     new CustomError(
  //       "There was an errror sending the email. Try again later",
  //       500
  //     )
  //   );
  // }
});

exports.resetPassword = catchAsyncErr(async (req, res, next) => {
  console.log(req.params);
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // get user based on the tooken
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // if token has not expired and there isuser
  if (!user) {
    return next(new CustomError("Token is invalid or has expired", 400));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendTokenAndResponse(user, 200, res);
});

exports.updatePassword = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const checkCurrentPassword = await user.correctPassword(
    req.body.currentPassword,
    user.password
  );

  if (!checkCurrentPassword) {
    return next(new CustomError("Your current password is wrong", 401));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  await user.save();

  sendTokenAndResponse(user, 200, res);
});

exports.logout = (req, res, next) => {
  console.log("his");
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
  });
};
