import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Share from '$components/common/Share';
import { routePaths } from '$common/routeConfig';

import styles from './index.module.scss';

const checkmark = require('$assets/images/checkmark.svg');

const SuccessPage = () => {
  // store
  const location = useLocation();
  const history = useHistory();

  // effects
  useEffect(() => {
    if (!location.state) {
      history.replace(routePaths.home);
      return;
    }
  }, [location]);

  if (!location.state) { // ensure the app doesn't crash on no state
    return null;
  }

  const { message, name, country, link, avatar } = location.state;

  // render
  return (
    <div className={`d-flex flex-column ${styles.successWrapper}`}>
      <div className="d-flex align-items-center justify-content-center success-message-wrapper my-4">
        <img src={checkmark} alt="" />
        <span className={`mx-2 ${styles.successMessage}`}>{message}</span>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8">
          <div className={styles.successDialogWrapper}>
            <Share
              name={name}
              country={country}
              link={link}
              avatar={avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
