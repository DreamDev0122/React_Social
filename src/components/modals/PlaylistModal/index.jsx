import React from 'react';

import PlaylistMenu from '$components/common/PlaylistMenu';

import styles from './index.module.scss';

const PlaylistModal = (props) => {
  // render
  return (
    <div className={styles.playlistWrapper}>
      <PlaylistMenu
        {...props}
      />
    </div>
  );
}

export default PlaylistModal;
