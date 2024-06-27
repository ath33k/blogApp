const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "A post must have a heading"],
    },
    description: {
      type: String,
      required: [true, "A post must have a description"],
    },
    content: {
      type: String,
      required: [true, "A post must have a content"],
    },
    // category: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Category",
    //     required: [true, "A post must have a category"],
    //   },
    // ],
    category: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Category",
          required: [true, "A post must have a category"],
        },
      ],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "Category cannot be empty",
      },
    },
    // category: {
    //   type: [String],
    //   required: [true, "please confirm your category"],
    //   enum: [
    //     "education",
    //     "technology",
    //     "finance",
    //     "health",
    //     "travel",
    //     "fashion",
    //     "food",
    //     "other",
    //   ],
    //   default: ["other"],
    //   validate: {
    //     validator: function (arr) {
    //       return arr.length > 0;
    //     },
    //     message: "Category field count cannot be empty",
    //   },
    // },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Foreign field means FK in the 'Likes' which belong to 'Post'
 * localField means PK in the 'Post'
 */
postsSchema.virtual("likes", {
  ref: "Like",
  foreignField: "post",
  localField: "_id",
});

postsSchema.pre(/^find/, function (next) {
  // if (req.query.category) {
  //   this.find({ category: req.query.category });
  // }
  next();
});

// postsSchema.virtual("categories", {
//   ref: "Category",
//   foreignField: "post",
//   localField: "_id",
// });

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
