import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal } from '$redux/features/modal';

import styles from './index.module.scss';

import AlertModal from '$components/modals/Alert';
import LoginModal from '$components/modals/Login';
import SignUpModal from '$components/modals/SignUp';
import ForgotPasswordModal from '$components/modals/ForgotPassword';
import ResetPasswordModal from '$components/modals/ResetPassword';
import LoaderModal from '$components/modals/Loader';
import PlaylistModal from '$components/modals/PlaylistModal';
import ShareModal from '$components/modals/ShareModal';

const MODAL_COMPONENTS = {
  'ALERT_MODAL': AlertModal,
  'LOGIN_MODAL': LoginModal,
  'SIGNUP_MODAL': SignUpModal,
  'FORGOT_PASSWORD_MODAL': ForgotPasswordModal,
  'RESET_PASSWORD_MODAL': ResetPasswordModal,
  'LOADER_MODAL': LoaderModal,
  'SHARE_MODAL': ShareModal,
  'PLAYLIST_MODAL': PlaylistModal,
  'EMPTY': () => <div />,
};

const ModalRoot = () => {
  // store
  const dispatch = useDispatch();
  const modalType = useSelector((store) => store.modal.type);
  const modalProps = useSelector((store) => store.modal.modalProps);

  // effects
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
      return;
    }

    document.body.style.overflow = 'unset'
    document.removeEventListener('keydown', handleKeydown);
  }, [modalType]);

  // handlers
  const closeModal = () => {
    dispatch(hideModal());
  }

  const handleKeydown = useCallback((evt) => {
    const { keyCode } = evt;
    if (modalProps && modalProps.preventOutsideClick) {
      return;
    };

    // Esc key
    if (keyCode === 27) {
      closeModal();
    }
  }, [closeModal, modalProps]);

  const handleClick = (evt) => {
    if (modalProps && modalProps.preventOutsideClick) {
      return;
    };

    evt.preventDefault();
    dispatch(hideModal());
  };

  const handleInnerClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // render
  if (!modalType) {
    return null; 
  }

  const ModalContent = MODAL_COMPONENTS[modalType];

  if (modalProps && modalProps.noWrapper) {
    return (
      <div
        className={styles.modalContainer}
        onClick={handleClick}
      >
        <ModalContent
          {...modalProps}
          closeModal={closeModal}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.modalContainer}
      onClick={handleClick}
    >
      <div className="row justify-content-center">
        <div className="col-10 col-md-8">
          <div
            className={styles.modalWrapper}
            onClick={handleInnerClick}
          >
            <ModalContent
              {...modalProps}
              closeModal={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRoot;
