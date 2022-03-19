import React, { useState, useEffect } from 'react';
import classes from './SignupScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/userActions';
import Loader from '../components/Loader';

const SignupScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignup = useSelector((state) => state.userSignup);
  const { loading: loadingSignup, userInfo: userInfoSignup } = userSignup;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfoSignup) {
      props.history.push('/');
    }
  }, [props, userInfoSignup]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signup(name, email, password));
  };

  return (
    <section className={classes.loginSection}>
      <div className={classes.loginContainer}>
        {loadingSignup ? (
          <Loader />
        ) : (
          <>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes.input}
              ></input>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
              ></input>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
              ></input>

              <button type="submit" className={classes.signup}>
                Sign up
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default SignupScreen;
