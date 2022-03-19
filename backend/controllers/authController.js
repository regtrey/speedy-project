const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const createToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  console.log(token);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new AppError('User already exists!', 400));
  }

  const newUser = await User.create(req.body);

  createToken(newUser, 201, req, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  // Check if there's an email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exist and if the password matches
  const currentUser = await User.findOne({ email }).select('+password');
  if (
    !currentUser ||
    !(await currentUser.correctPassword(password, currentUser.password))
  ) {
    return next(new AppError('Incorrect email or password', 400));
  }

  // Send token
  createToken(currentUser, 200, req, res);
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user does not exist!'));
  }

  req.user = currentUser;
  next();
});
