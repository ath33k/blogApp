const CustomError = require("../utils/customError");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new CustomError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. `;
  return new CustomError(message, 404);
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
    console.log("ERROR 🔥", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = { ...err };
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    if (err.name === "CastError") error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
