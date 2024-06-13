const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

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
