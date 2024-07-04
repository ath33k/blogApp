const Category = require("../model/categoryModel");
const CustomError = require("../utils/customError");
const catchAsyncErr = require("./../utils/catchAsyncErr");

exports.getAllCategories = catchAsyncErr(async (req, res, next) => {
  const categories = await Category.find();
  if (!categories) {
    return next(new CustomError("Categories hasn't found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

exports.getCategory = catchAsyncErr(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new CustomError("Category hasn't found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.createCategory = catchAsyncErr(async (req, res, next) => {
  const category = await Category.create(req.body);
  if (!category) {
    return next(
      new CustomError("An error ouccured while creating category", 500)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsyncErr(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new CustomError("Couldnt update", 500));
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
});

exports.deleteCategory = catchAsyncErr(async (req, res, next) => {
  console.log(req.params.id);
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);

  if (!deletedCategory) {
    return next(new CustomError("Category not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
