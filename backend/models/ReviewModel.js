const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Review must have a user'],
    },
    car: {
      type: mongoose.Schema.ObjectId,
      ref: 'Car',
      required: [true, 'A Review must have a car'],
    },
    comment: {
      type: String,
      required: [true, 'A Review must have a comment'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timeStamps: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
