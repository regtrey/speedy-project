import React, { useState, useEffect } from 'react';
import classes from './LoginScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
  }, [props, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const signupHandler = (e) => {
    e.preventDefault();

    props.history.push('/signup');
  };

  return (
    <section className={classes.loginSection}>
      <div className={classes.textContainer}>
        <h1 className={classes.textLogo}>speedy</h1>
        <p className={classes.textSub}>
          Travel with no worries around the city with Speedy.
        </p>
      </div>
      <div className={classes.loginContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <form onSubmit={submitHandler}>
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

              <button type="submit" className={classes.loginBtn}>
                Log In
              </button>
            </form>
            <div className={classes.divider}></div>
            <button className={classes.signup} onClick={signupHandler}>
              Sign up
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginScreen;
