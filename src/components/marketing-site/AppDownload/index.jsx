import React from 'react';

import styles from './index.module.scss';

const phone = require('$assets/images/phone.png');
const appstore = require('$assets/images/appstore.svg');
const playstore = require('$assets/images/playstore.svg');

const AppDownload = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-3">
        <img
          src={phone}
          className={styles.phoneMkImage}
          alt=""
        /> 
      </div>
      <div className="col-12 col-md-9">
        <div className={styles.innerWrapper}>
          <p className={`${styles.appDownloadHeader}`}>Never stop listening</p>
          <p>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
          <div className="d-flex">
            <img
              src={appstore}
              className={styles.storeIcon}
              alt=""
            />
            <img
              src={playstore}
              className={styles.storeIcon}
              alt=""
            />
          </div>
        </div>
        <div />
      </div>
    </div>
  )
}

export default AppDownload;
