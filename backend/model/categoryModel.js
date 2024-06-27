const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A category must have Name"],
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// categorySchema.virtual("posts", {
//   ref: "Post",
//   foreignField: "category",
//   localField: "_id",
// });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
