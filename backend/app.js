const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const globalErrorHandler = require("./controller/errorController");
const CustomeError = require("./utils/customError");

const app = express();
// GLOBAL MIDDLEWARES
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);
// DEVELOPMENT LOGGING
console.log(`---${process.env.NODE_ENV}---`);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));
// Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

// ROUTES
//mounting routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// to all routes that doesnt hit any of the aboove middlewares (Invalid routes)
app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "hellow from server",
  });
});

app.all("*", (req, res, next) => {
  // when we pass something thourgh next()
  //fucniton express automatically detecs as an error
  next(new CustomeError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error handling middleware funciton
app.use(globalErrorHandler);

module.exports = app;
