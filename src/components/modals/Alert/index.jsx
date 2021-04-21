import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '$components/common/Button';

import { showModal } from '$redux/features/modal';

import styles from './index.module.scss';

const alertIcon = require('$assets/images/alert-icon.svg');

const AlertModal = () => {
  //store
  const dispatch = useDispatch();

  // handlers
  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleSignUp = () => {
    dispatch(showModal('SIGNUP_MODAL'));
  };

  // render
  return (
    <div className="row p-4">
      <div className="col-12 col-md-4 col-lg-3">
        <img
          className={styles.alertIcon}
          src={alertIcon}
          alt=""
        />
      </div>
      <div className="col-12 col-md-8 col-lg-9">
        <p className="heading-1 mt-2">OOps</p>
        <p className="mt-2">To access premium contents you must first.</p>
        <Button onClick={handleLogin}>Login</Button>
        <div className="row mt-2 justify-content-center align-items-center">
          <div className="col">
            Don&apos;t have an account?
          </div>
          <div className="col-9">
            <Button
              style={styles.alertSignMk}
              onClick={handleSignUp}
              isTransparent
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
