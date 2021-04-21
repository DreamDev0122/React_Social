import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';

import styles from './index.module.scss';

const stand = require('$assets/images/not-found-1.png');
const cloud = require('$assets/images/not-found-2.png');

const NotFound = () => {
  // store
  const history = useHistory();

  // handlers
  const handleNav = () => {
    history.replace(routePaths.home);
    // hacky tech debt returns to same not-found
    window.location.reload();
  }

  // render
  return (
    <div className={`d-flex align-items-center ${styles.wrapper}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <img
              className={styles.clouds}
              src={cloud}
              alt=""
            />
            <div className={styles.panel}>
              <p className={styles.heading}>Error 404</p>
              <p className={styles.content}>
                <span className={styles.subheading}>Ooops....<br /></span>
              We are sorry the page you requested could not be found
            </p>
              <Button
                onClick={handleNav}
              >
                Go Home
          </Button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              className=""
              src={stand}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
