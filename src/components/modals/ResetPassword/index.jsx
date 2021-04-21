import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';

import { showModal } from '$redux/features/modal';
import { resetPassword } from '$redux/features/authentication';
import { routePaths } from '$common/routeConfig';

const ResetPassword = (props) => {
  // props
  const { token } = props;

  // state
  const [hasError, setHasError] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const resetPasswordError = useSelector((store) => store.authentication.resetPasswordError);
  const resetPasswordComplete = useSelector((store) => store.authentication.resetPasswordComplete);
  const resetPasswordPending = useSelector((store) => store.authentication.resetPasswordPending);

  // effects
  useEffect(() => {
    setHasError(resetPasswordError);
  }, [resetPasswordError]);

  useEffect(() => {
    if (!resetPasswordComplete) {
      return;
    }

    history.replace(routePaths.home);
  }, [resetPasswordComplete]);

  // handlers
  const handleReset = () => {
    if (values.password !== values.confirmPassword) {
      setHasError(true);
      return;
    }
    dispatch(resetPassword({
      reset_token: token,
      password: values.password,
    }));
  };

  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleChange = (name, value) => {
    setHasError(false);
    setValues({
      ...values,
      [name]: value,
    });
  }

  // render
  return (
    <div className="row justify-content-center">
      {
        hasError && (
          <Alert
            content={"Failed to reset password. Try again"}
            type="error"
          />
        )
      }
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          <InfoPane value="Reset your Password" />
          <div className="col-12 col-sm-10 col-md-8 mt-4">
            <p className="text-center">Enter Your New Password.</p>
            <TextInput
              name="password"
              type="password"
              placeholder="Enter new password"
              value={values.password}
              onChange={handleChange}
            />
            <TextInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center my-2">
              <Button
                style="mk-btn-secondary"
                onClick={handleReset}
                isStretch
              >
                Send Request
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Back to </span>
              <Button
                style="mk-btn-secondary no-width"
                onClick={handleLogin}
                isTransparent
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
