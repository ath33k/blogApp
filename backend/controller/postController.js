exports.getAllPosts = (req, res, next) => {
  res.status(200).json({
    data: "hellofrompost",
  });
};
