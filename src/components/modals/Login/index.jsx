import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';
import Alert from '$components/authentication/Alert';

import { showModal } from '$redux/features/modal';
import { login } from '$redux/features/authentication';

import { routePaths } from '$common/routeConfig';

import './index.scss';

const initialValues = {
  email: '',
  password: '',
};

const LoginModal = () => {
  // state
  const [values, setValues] = useState(initialValues);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const loginPending = useSelector((store) => store.authentication.loginPending);
  const error = useSelector((store) => store.authentication.loginError);
  const token = useSelector((store) => store.authentication.token);

  // effects
  useEffect(() => {
    if (token) {
      history.push(routePaths.home);
      return;
    }

    history.push(routePaths.marketing);
  }, [token]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    dispatch(showModal('FORGOT_PASSWORD_MODAL'));
  };

  const handleSignUp = () => {
    dispatch(showModal('SIGNUP_MODAL'));
  };

  const handleSignIn = () => {
    const { email, password } = values;
    dispatch(login({
      username: email,
      password,
    }));
  };

  // render
  return (
    <div className="row justify-content-center">
      {
        error && (
          <Alert
            content="Failed to login. Try again"
            type="error"
          />
        )
      }
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          <InfoPane value="Login to Mkondo Music" />
          <div className="col-12 col-sm-10 col-md-8 mt-4">
            <TextInput
              name="email"
              placeholder="Email Address / User Name"
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center my-2">
              <Button
                onClick={handleSignIn}
                isLoading={loginPending}
                isSecondary
                isStretch
              >
                Login
              </Button>
            </div>
            <div className="d-flex justify-content-center my-2">
              <Button
                onClick={handleForgotPassword}
                isTransparent
                isTertiary
                noBorder
              >
                Forgot Password?
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Don&apos;t have an account? </span>
              <Button
                onClick={handleSignUp}
                isTransparent
                isTertiary
                noBorder
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
