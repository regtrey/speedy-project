import {
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from '../constants/reviewConstants';

export const getReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return { loading: true };

    case GET_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload.reviews };

    case GET_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true };

    case CREATE_REVIEW_SUCCESS:
      return { loading: false };

    case CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
