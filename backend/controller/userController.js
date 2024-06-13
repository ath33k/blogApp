exports.getAllUser = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(200).json({
      data: "Hit development",
    });
  }
};
