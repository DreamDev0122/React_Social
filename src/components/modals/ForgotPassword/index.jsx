import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';

import { showModal } from '$redux/features/modal';
import { forgotPassword } from '$redux/features/authentication';

const ForgotPasswordModal = () => {
  // state
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState('');

  // store
  const dispatch = useDispatch();
  const forgotPasswordError = useSelector((store) => store.authentication.forgotPasswordError);
  const forgotPasswordComplete = useSelector((store) => store.authentication.forgotPasswordComplete);
  const forgotPasswordPending = useSelector((store) => store.authentication.forgotPasswordPending);

  // effects
  useEffect(() => {
    if (forgotPasswordError && !hasError) {
      setHasError(true);
      return;
    }
  }, [forgotPasswordError]);

  // handlers
  const handleForgot = () => {
    dispatch(forgotPassword({
      email,
    }));
  };

  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleChange = (name, value) => {
    if (hasError) {
      setHasError(false);
    }
    setEmail(value);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          {
            forgotPasswordComplete && (
              <Alert
                content="Reset password instructions has been succesfully sent to your email address."
                type="success"
              />
            )
          }
          {
            hasError && (
              <Alert
                content="The entered email address doesn't exist. Please try again."
                type="error"
              />
            )
          }
          <InfoPane value="Yo! Forget Your Password" />
          <div className="col-12 col-sm-10 col-md-8 mt-4">
            <p className="text-center">No worries! Enter Your email and we will send  you a request.</p>
            <TextInput
              name="email"
              placeholder="Your email"
              value={email}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center my-2">
              <Button
                onClick={handleForgot}
                isLoading={forgotPasswordPending}
                isSecondary
                isStretch
              >
                Send Request
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Back to </span>
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
}

export default ForgotPasswordModal;
