import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';
import InputField from '$components/forms/InputField';

import { showModal, hideModal } from '$redux/features/modal';
import { signup } from '$redux/features/authentication';

import { routePaths } from '$common/routeConfig';

const options = [
  { value: 'user', label: 'User' },
  { value: 'creator', label: 'Artist' },
  { value: 'admin', label: 'Manager' },
];

const initialValues = {
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: options[0],
};

const menu = {
  name: 'userType',
  type: 'select',
  placeholder: 'User Type',
  options,
}

const SignupModal = () => {
  // state
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const signupError = useSelector((store) => store.authentication.signupError);
  const signUpComplete = useSelector((store) => store.authentication.signUpComplete);
  const signupPending = useSelector((store) => store.authentication.signupPending);

  // effects
  useEffect(() => {
    // routePaths.onBoarding
    if (!signUpComplete) {
      return;
    }

    dispatch(hideModal()); // Should close on route change?
    history.replace(routePaths.onBoarding);
  }, [signUpComplete]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleSignUp = () => {
    if (values.password !== values.confirmPassword) {
      setError('Passwords don\'t match');
      return;
    }

    let isValid = true;

    for (const value in values) {
      if (!values[value]) {
        isValid = false;
      }
    }

    if (!isValid) {
      setError('Please fill all fields to proceed.');
      return;
    }

    dispatch(signup({
      full_name: values.fullName,
      phone_number: values.phoneNumber,
      email: values.email,
      password: values.password,
      user_type: values.userType.value, // user, creator, admin
      country: 'TZ',
    }));
  };

  // render
  return (
    <div className="row justify-content-center">
      {
        (error || signupError)
        && (
          <Alert
            content={error || "Failed to sign up. Try again"}
            type="error"
          />
        )
      }
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          <InfoPane value="Sign Up to Mkondo Music" />
          <div className="col-12 col-sm-10 col-md-8 mt-4">
            <TextInput
              name="fullName"
              placeholder="Fullname"
              value={values.fullName}
              onChange={handleChange}
            />
            <TextInput
              name="email"
              placeholder="Email Address"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <TextInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <InputField
              field={{
                ...menu,
                value: values[menu.name]
              }}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center my-2">
              <Button
                onClick={handleSignUp}
                isLoading={signupPending}
                isSecondary
                isStretch
              >
                Sign Up
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Have an account? </span>
              <Button
                onClick={handleLogin}
                isTransparent
                isTertiary
                noBorder
                noWidth
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;