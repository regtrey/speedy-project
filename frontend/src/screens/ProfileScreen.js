import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ProfileScreen.module.css';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/login');
    } else {
      setUserId(props.match.params.id);
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, props, userInfo, user, success, userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (userInfo && user) {
      dispatch(updateUserProfile(userId, name, email));
    }
  };

  return (
    <section className={classes.profileSection}>
      <h1 className={classes.profileTitle}>Profile</h1>
      <div className={classes.profileContainer}>
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            placeholder="User Name"
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <button>Update</button>
        </form>
      </div>
    </section>
  );
};

export default ProfileScreen;
