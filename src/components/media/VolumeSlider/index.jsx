import React from 'react';
import { useDispatch } from 'react-redux';

import Slider from '$components/common/Slider';
import { updateVolume } from '$redux/features/player';

import styles from './index.module.scss';

const volumeFullIcon = require('$assets/images/player/volume-full.svg');

const VolumeSlider = (props) => {
  // props
  const {
    position,
  } = props;

  // store
  const dispatch = useDispatch();

  // handlers
  const updateRange = (value) => {
    dispatch(updateVolume(value));
  }

  // render
  return (
    <div className={`d-flex align-items-center ${styles.playerVolumeWrapper}`}>
      <button
        className={`${styles.playerBtn} ${styles.playerVolumeBtn}`}
      >
        <img
          src={volumeFullIcon}
          alt=""
        />
      </button>
      <Slider
        position={position}
        callbacks={{
          updateRange,
        }}
      />
    </div>
  );
}

export default VolumeSlider;
