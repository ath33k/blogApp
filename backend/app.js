const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const globalErrorHandler = require("./controller/errorController");
const CustomeError = require("./utils/customError");

const app = express();
// GLOBAL MIDDLEWARES
app.use(express.json());

// ROUTES
//mounting routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// to all routes that doesnt hit any of the aboove middlewares (Invalid routes)
app.all("*", (req, res, next) => {
  // when we pass something thourgh next()
  //fucniton express automatically detecs as an error
  next(new CustomeError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error handling middleware funciton
app.use(globalErrorHandler);

module.exports = app;
