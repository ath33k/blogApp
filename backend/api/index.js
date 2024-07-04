const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { initializeApp } = require("firebase/app");
const { getStorage, ref } = require("firebase/storage");
const { firebaseApp } = require("../utils/firebaseConfig");
const firebase = firebaseApp();
const mongoose = require("mongoose");
// Import the functions you need from the SDKs you need
const app = require("../app");

// DB CONNECTION
const DB = process.env.DATABASE_CONNECTION.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<DBNAME>", process.env.DATABASE_NAME);

mongoose.connect(DB).then(() => {
  console.log("DB connection Successful...!");
});

const port = process.env.PORT || 3000;
console.log(port);
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANLED REJECTION 🔥 Shutting donw...");
  server.close(() => {
    process.exit(1);
  });
});
