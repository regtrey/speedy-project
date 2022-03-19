const Review = require('../models/ReviewModel');
const AppError = require('../utils/appError');
const asyncHandler = require('express-async-handler');

exports.getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({});

  res.status(200).json({
    status: 'success',
    reviews,
  });
});

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 400));
  }

  res.status(200).json({
    status: 'success',
    review,
  });
});

exports.createReview = asyncHandler(async (req, res, next) => {
  const { user, car, comment } = req.body;

  const review = await Review.create({
    user,
    car,
    comment,
  });

  res.status(201).json({
    status: 'success',
    review,
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 400));
  }

  review.comment = req.body.comment || review.comment;
  review.rating = req.body.rating || review.rating;

  await review.save();

  res.status(200).json({
    status: 'success',
    review,
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 400));
  }

  await review.delete();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
