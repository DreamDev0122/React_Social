import React from 'react';

import styles from './index.module.scss';

const playIcon = require('$assets/images/player/play.svg');
const pauseIcon = require('$assets/images/player/pause.svg');

const PlayBtn = (props) => {
  // props
  const {
    isLoading,
    isPlaying,
  } = props;

  // render
  if (isLoading) {
    return (
      <span
        className="spinner-border spinner-border-lg text-light"
        role="status"
        aria-hidden="true"
      />
    );
  }

  if (isPlaying) {
    return (
      <div className={styles.playIcon}>
        <img
          className={styles.pauseIcon}
          src={pauseIcon}
          alt=""
        />
      </div>
    );
  }

  return (
    <div className={styles.playIcon}>
      <img
        src={playIcon}
        alt=""
      />
    </div>
  );
}

export default PlayBtn;
