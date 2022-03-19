import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { listCars } from '../actions/carActions';
import { USER_LOGOUT } from '../constants/userConstants';

const Header = () => {
  const [toolbar, setToolbar] = useState(false);
  const [attachedClass, setAttachedClass] = useState([classes.drawer]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {}, [dispatch, userInfo, user, toolbar]);

  const carsHandler = () => {
    dispatch(listCars());
  };

  const logoutHandler = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
  };

  const toolbarHandler = (e) => {
    e.preventDefault();

    setToolbar(!toolbar);

    if (toolbar === true) {
      setAttachedClass([classes.drawer, classes.open]);
      setAttachedClass([classes.drawer, classes.open]);
    } else if (toolbar === false) {
      setAttachedClass([classes.drawer]);
    }
  };

  return (
    <>
      <div className={attachedClass.join(' ')}>
        <ul className={classes.sideLinks}>
          <li>
            <NavLink to="/" activeClassName={classes.active} exact>
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars"
              activeClassName={classes.active}
              onClick={carsHandler}
            >
              cars
            </NavLink>
          </li>
          {userInfo ? (
            <li>
              <NavLink
                to={`/profile/${userInfo.data.user._id}`}
                activeClassName={classes.active}
              >
                {userInfo.data.user.name.toLowerCase()}
              </NavLink>
            </li>
          ) : null}

          {userInfo ? (
            <li>
              <NavLink to="/" onClick={logoutHandler}>
                logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
          )}
        </ul>
      </div>
      <header>
        <button className={classes.toolbar} onClick={toolbarHandler}>
          <div className={classes.bar}></div>
          <div className={classes.bar2}></div>
        </button>

        <h1 className={classes.logo}>
          <NavLink to="/" className={classes.logoLink} exact>
            speedy
          </NavLink>
        </h1>
        <ul className={classes.none}>
          <li className={classes.none}>
            <NavLink
              to="/"
              className={classes.links}
              activeClassName={classes.navActive}
              exact
            >
              home
            </NavLink>
          </li>
          <li className={classes.none}>
            <NavLink
              to="/cars"
              className={classes.links}
              activeClassName={classes.navActive}
              onClick={carsHandler}
            >
              cars
            </NavLink>
          </li>
          {userInfo ? (
            <li className={classes.none}>
              <NavLink
                to={`/profile/${userInfo.data.user._id}`}
                className={classes.links}
                activeClassName={classes.navActive}
              >
                {userInfo.data.user.name.toLowerCase()}
              </NavLink>
            </li>
          ) : null}
        </ul>

        {userInfo ? (
          <NavLink to="/">
            <button className={classes.login} onClick={logoutHandler}>
              logout
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button className={classes.login}>login</button>
          </NavLink>
        )}
      </header>
    </>
  );
};

export default Header;
