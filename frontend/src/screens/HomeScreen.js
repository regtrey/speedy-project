import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import Product from '../components/Product';
import classes from './HomeScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { listCars } from '../actions/carActions';
import { CAR_LIST_RESET } from '../constants/carConstants';

const HomeScreen = (props) => {
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carList = useSelector((state) => state.carList);
  const { loading, cars } = carList;

  useEffect(() => {
    dispatch(listCars());
  }, [dispatch, type]);

  const sedanHandler = () => {
    dispatch({ type: CAR_LIST_RESET });
    dispatch(listCars());
    setType('sedan');
  };

  const suvHandler = () => {
    dispatch({ type: CAR_LIST_RESET });
    dispatch(listCars());
    setType('suv');
  };

  const coupeHandler = () => {
    dispatch({ type: CAR_LIST_RESET });
    dispatch(listCars());
    setType('coupe');
  };

  const sportsHandler = () => {
    dispatch({ type: CAR_LIST_RESET });
    dispatch(listCars());
    setType('sportscar');
  };

  return (
    <>
      <div className={classes.welcome}>
        <h1>
          Welcome{' '}
          {userInfo ? userInfo.data.user.name.toLowerCase().split(' ')[0] : ''}
        </h1>
      </div>
      <div className={classes.displayLinks}>
        <ul>
          <li>
            <NavLink to="/" onClick={sedanHandler}>
              sedan
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={suvHandler}>
              suv
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={coupeHandler}>
              coupe
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={sportsHandler}>
              sportscar
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={classes.productContainer}>
        {loading ? (
          <Loader />
        ) : type !== '' ? (
          cars
            .filter((car) => car.carType === type)
            .slice(0, 4)
            .map((car) => <Product key={car._id} car={car} />)
        ) : (
          cars.slice(0, 4).map((car) => <Product key={car._id} car={car} />)
        )}
      </div>
    </>
  );
};

export default HomeScreen;
