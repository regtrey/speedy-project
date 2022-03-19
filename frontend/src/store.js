import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { carListReducer, carDetailsReducer } from './reducers/carReducer';
import {
  userLoginReducer,
  userSignupReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer';
import {
  getReviewsReducer,
  createReviewsReducer,
} from './reducers/reviewReducer';

const reducer = combineReducers({
  carList: carListReducer,
  carDetails: carDetailsReducer,
  getReviews: getReviewsReducer,
  createReviews: createReviewsReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const userStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : [];

const initialState = { userLogin: userStorage };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
