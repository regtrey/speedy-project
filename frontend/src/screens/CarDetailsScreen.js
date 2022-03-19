import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import { detailsCar } from '../actions/carActions';
import { allReviews, createReview } from '../actions/reviewActions';
import classes from './CarDetailsScreen.module.css';

const CarDetailsScreen = (props) => {
  const [carId, setCarId] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  const getReviews = useSelector((state) => state.getReviews);
  const { reviews } = getReviews;

  useEffect(() => {
    const carId = props.match.params.id;
    setCarId(carId);

    if (userInfo) {
      dispatch(getUserDetails(userInfo.data.user._id));
    }

    dispatch(detailsCar(carId));
    dispatch(allReviews());
  }, [props, dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (userInfo && user) {
      dispatch(createReview(user._id, carId, comment));
      dispatch(allReviews());
      setComment('');
    }
  };

  return (
    <section>
      <div className={classes.carNameContainer}>
        <h1 className={classes.carName}>
          {car.brand} {car.model}
        </h1>
      </div>

      <div className={classes.carDetailsContainer}>
        <div className={classes.carImageContainer}>
          <img src={car.image} alt={car.model} className={classes.carImage} />
        </div>

        <div className={classes.carDescriptionContainer}>
          <p className={classes.carDetails}>
            Brand: <span>{car.brand}</span>
          </p>
          <p className={classes.carDetails}>
            Model: <span>{car.model}</span>
          </p>
          <p className={classes.carDetails}>
            Year: <span>{car.modelYear}</span>
          </p>
          <p className={classes.carDescription}>{car.description}</p>

          <div className={classes.priceContainer}>
            <p className={classes.carDetails}>
              Rent Price:{' '}
              <span className={classes.price}>
                ₱
                {Number(car.rentPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>

          <NavLink to={`/cars/${car._id}/checkout`}>
            <button className={classes.rentButton} disabled={!car.isAvailable}>
              {car.isAvailable ? 'Rent Car' : 'Not Available'}
            </button>
          </NavLink>
        </div>
      </div>

      <div className={classes.carReviewsContainer}>
        <h1 className={classes.reviewsTitle}>Reviews</h1>

        {reviews
          ? reviews
              .filter((review) => review.car === carId)
              .map((review) => (
                <div className={classes.reviewContainer} key={review._id}>
                  <h3 className={classes.reviewer}>{review.user.name}</h3>
                  <p className={classes.review}>{review.comment}</p>
                </div>
              ))
          : ''}
      </div>

      {userInfo && user && !user.isAdmin ? (
        <form onSubmit={submitHandler} className={classes.formContainer}>
          <label className={classes.formLabel}>Comment</label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button className={classes.reviewButton}>Submit</button>
        </form>
      ) : (
        <p className={classes.loginAdvisory}>
          Please <a href="/login">login</a> as a user to review
        </p>
      )}
    </section>
  );
};

export default CarDetailsScreen;
