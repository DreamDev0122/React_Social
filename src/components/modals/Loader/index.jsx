import React from 'react';

import styles from './index.module.scss';

const Loader = () => {
  // render
  return ( // <div className="spinner-border" role="status" />
    <>
      <div className={`d-flex align-items-center justify-content-center ${styles.spinnerBorderWrapper}`}>
        <div className={`spinner-border ${styles.spinnerBorder}`} role="status" />
        <p className={styles.spinnerWrapperText}>Please wait...</p>
      </div>
    </>
  );
}

export default Loader;
