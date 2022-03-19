import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Product from '../components/Product';
import classes from './CarScreen.module.css';
import { listCars } from '../actions/carActions';

const CarScreen = () => {
  const dispatch = useDispatch();

  const carList = useSelector((state) => state.carList);
  const { loading, cars } = carList;

  useEffect(() => {
    dispatch(listCars());
  }, [dispatch]);

  return (
    <>
      <div className={classes.types}>
        <h1>sedan</h1>
      </div>

      <div className={classes.productContainer}>
        {loading ? (
          <Loader />
        ) : (
          cars
            .filter((car) => car.carType === 'sedan')
            .map((car) => <Product key={car._id} car={car} />)
        )}
      </div>

      <div className={classes.types}>
        <h1>suv</h1>
      </div>

      <div className={classes.productContainer}>
        {loading ? (
          <Loader />
        ) : (
          cars
            .filter((car) => car.carType === 'suv')
            .map((car) => <Product key={car._id} car={car} />)
        )}
      </div>

      <div className={classes.types}>
        <h1>coupe</h1>
      </div>

      <div className={classes.productContainer}>
        {loading ? (
          <Loader />
        ) : (
          cars
            .filter((car) => car.carType === 'coupe')
            .map((car) => <Product key={car._id} car={car} />)
        )}
      </div>

      <div className={classes.types}>
        <h1>sports car</h1>
      </div>

      <div className={classes.productContainer}>
        {loading ? (
          <Loader />
        ) : (
          cars
            .filter((car) => car.carType === 'sportscar')
            .map((car) => <Product key={car._id} car={car} />)
        )}
      </div>
    </>
  );
};

export default CarScreen;
