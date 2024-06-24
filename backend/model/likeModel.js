const mongoose = require("mongoose");

const likeModelSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Like must belong to a post"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Like must belong to a user"],
    },
    customId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

likeModelSchema.index({ post: 1, user: 1 }, { unique: true });

likeModelSchema.pre("save", async function (next) {
  if (!this.customId) {
    this.customId = `${this.user}_${this.post}`;
  }
  next();
});

likeModelSchema.pre(/^find/, function (next) {
  // this.populate({ path: "user", select: "name image" }).populate({
  //   path: "post",
  //   select: "heading",
  // });
  this.populate({ path: "user", select: "name image" });
  next();
});

const Like = mongoose.model("Like", likeModelSchema);

module.exports = Like;
