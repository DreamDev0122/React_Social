import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { toggleSideMenu } from '$redux/features/nav';

import styles from './index.module.scss';

const HamburgerMenu = () => {
  // store
  const dispatch = useDispatch();
  const location = useLocation();
  const isSideMenuOpen = useSelector((store) => store.nav.isSideMenuOpen);

  // effects
  useEffect(() => {
    if (!isSideMenuOpen) {
      return;
    }
    dispatch(toggleSideMenu(false));
  }, [location.pathname]);

  // handlers
  const handleToggle = () => {
    dispatch(toggleSideMenu(!isSideMenuOpen));
  }

  // render
  return (
    <div
      className={`${styles.menuToggle} ${isSideMenuOpen ? styles.active : '' }`}
      onClick={handleToggle}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default HamburgerMenu;
