const mongoose = require('mongoose');
const users = require('./data/users');
const cars = require('./data/cars');
const User = require('./models/UserModel');
const Car = require('./models/CarModel');
const dotenv = require('dotenv');

dotenv.config();
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('DB connection successful!'));

const importData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();

    await User.insertMany(users);
    await Car.insertMany(cars);

    console.log('Data imported!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();

    console.log('Data deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-import') {
  importData();
} else {
  deleteData();
}
