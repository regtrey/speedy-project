import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_SUCCESS,
  CAR_DETAILS_FAIL,
} from '../constants/carConstants';
import axios from 'axios';

export const listCars = () => async (dispatch) => {
  try {
    dispatch({ type: CAR_LIST_REQUEST });

    const { data } = await axios.get('/api/cars');

    dispatch({ type: CAR_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CAR_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailsCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/cars/${id}`);

    dispatch({ type: CAR_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CAR_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
