const CustomError = require("../utils/customError");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.error).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new CustomError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. `;
  return new CustomError(message, 404);
};

const handleMongoServerErrorDB = (err) => {
  const errors = err.errorResponse;
  let message;
  if (errors.code == 11000) {
    message = `Duplicate Key entered. Document already exists,`;
  } else {
    message = `An error occured: ${errors.errmsg}`;
  }
  return new CustomError(message, 400);
};

const sendErrorProd = (err, res) => {
  res.status(404).json({
    status: err.status,
    message: err.message,
  });
};

const sendErrorDev = (err, res) => {
  if (err.isOperational) {
    // Operational Error, trusted Error
    //send message to the client
    res.status(404).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // programming or other unknow error.
    // Do not leak error deatils
    console.log("ERROR 🔥", err.isOperational);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  if (process.env.NODE_ENV == "development") {
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.name === "MongoServerError") error = handleMongoServerErrorDB(err);

    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV == "production") {
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.name === "MongoServerError") error = handleMongoServerErrorDB(err);

    sendErrorProd(error, res);
  }
};
