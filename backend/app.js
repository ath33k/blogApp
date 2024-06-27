const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const globalErrorHandler = require("./controller/errorController");
const CustomeError = require("./utils/customError");

const app = express();
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
// app.options("*", function (req, res) {
//   res.status(200);
// });

// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
//   res.set("Access-Control-Allow-Credentials", "true");
//   next();
// });

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
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/categories", categoryRoutes);

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
