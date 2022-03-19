const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  modelYear: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    enum: ['sedan', 'suv', 'coupe', 'sportscar'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
