import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Product.module.css';

const Product = (props) => {
  return (
    <>
      <div className={classes.products}>
        <div className={classes.imgContainer}>
          <img
            className={classes.img}
            src={props.car.image}
            alt={props.car.model}
          />
        </div>
        <h2 className={classes.productName}>
          {props.car.brand} {props.car.model}
        </h2>

        <p className={classes.summary}>{props.car.summary}</p>

        <NavLink to={`/cars/${props.car._id}`}>
          <button className={classes.details} disabled={!props.car.isAvailable}>
            {props.car.isAvailable ? 'Details' : 'Not Available'}
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Product;
