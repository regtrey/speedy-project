import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <p className={classes.copyright}>
        Speedy &copy; 2022 by Reggie Manigos.
        <br /> All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
