import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_LIST_RESET,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_SUCCESS,
  CAR_DETAILS_FAIL,
  CAR_DETAILS_RESET,
} from '../constants/carConstants';

export const carListReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case CAR_LIST_REQUEST:
      return { loading: true, cars: [] };

    case CAR_LIST_SUCCESS:
      return { loading: false, cars: action.payload.cars };

    case CAR_LIST_FAIL:
      return { loading: false, error: action.payload };

    case CAR_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const carDetailsReducer = (state = { car: [] }, action) => {
  switch (action.type) {
    case CAR_DETAILS_REQUEST:
      return { loading: true, car: [] };

    case CAR_DETAILS_SUCCESS:
      return { loading: false, car: action.payload.car };

    case CAR_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case CAR_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
