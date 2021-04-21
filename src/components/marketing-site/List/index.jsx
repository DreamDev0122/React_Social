import React from 'react';

import styles from './index.module.scss';

const List = (props) => {
  // props
  const { num, title, description } = props;
  return (
    <div className="d-flex mb-4">
      <div className={`d-flex justify-content-center align-items-center ${styles.listNumWrapper}`}>
        <span>{num}</span>
      </div>
      <div className={styles.listContentWrapper}>
        <p className={`${styles.listHeader}`}>{title}</p>
        <p className={`${styles.listDescription}`}>{description}</p>
      </div>
    </div>
  );
}

export default List;
