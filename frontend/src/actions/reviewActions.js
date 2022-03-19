import {
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from '../constants/reviewConstants';
import axios from 'axios';

export const allReviews = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });

    const { data } = await axios.get('/api/reviews');
    dispatch({ type: GET_REVIEW_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createReview = (user, car, comment) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/reviews', { user, car, comment }, config);
    dispatch({ type: CREATE_REVIEW_SUCCESS });
  } catch (err) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
