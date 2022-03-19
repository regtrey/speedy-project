const Car = require('../models/CarModel');
const AppError = require('../utils/appError');
const asyncHandler = require('express-async-handler');

exports.getAllCars = asyncHandler(async (req, res, next) => {
  const cars = await Car.find({});

  if (!cars) {
    return next(new AppError('No cars found', 404));
  }

  res.status(200).json({
    status: 'success',
    cars,
  });
});

exports.getCar = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('Car not found', 404));
  }

  res.status(200).json({
    status: 'success',
    car,
  });
});

exports.createCar = asyncHandler(async (req, res, next) => {
  const car = await Car.create({
    brand: req.body.brand,
    model: req.body.model,
    modelYear: req.body.modelYear,
    carType: req.body.carType,
    description: req.body.description,
    summary: req.body.summary,
    image: req.body.image,
    rentPrice: req.body.rentPrice,
  });

  res.status(201).json({
    status: 'success',
    car,
  });
});

exports.updateCar = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('Car not found', 404));
  }

  car.brand = req.body.brand || car.brand;
  car.model = req.body.model || car.model;
  car.modelYear = req.body.modelYear || car.modelYear;
  car.carType = req.body.carType || car.carType;
  car.description = req.body.description || car.description;
  car.summary = req.body.summary || car.summary;
  car.image = req.body.image || car.image;
  car.rentPrice = req.body.rentPrice || car.rentPrice;
  car.price = req.body.price || car.price;
  car.isAvailable = req.body.isAvailable || car.isAvailable;

  await car.save();

  res.status(200).json({
    status: 'success',
    car,
  });
});

exports.deleteCar = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('Car not found', 404));
  }

  await car.delete();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
