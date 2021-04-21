import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from '$components/common/Slider';
import { formatTime } from '$common/utils';
import { seek } from '$redux/features/player';

import styles from './index.module.scss';

const ProgressSlider = (props) => {
  // props
  const {
    position,
    duration,
    onSeek,
  } = props;

  // store
  const dispatch = useDispatch();

  // handlers
  const updateRange = (value) => {
    if (onSeek) {
      onSeek(value);
      return;
    }
    dispatch(seek(value));
  }

  // render
  return (
    <div className={`d-flex align-items-center ${styles.playerDurationWrapper}`}>
      <span className={styles.playerTime}>{formatTime(position)}</span>
      <Slider
        position={(position / duration)}
        callbacks={{
          updateRange,
        }}
      />
      <span className={styles.playerTime}>{formatTime(duration - position)}</span>
    </div>
  );
}

ProgressSlider.defaultProps = {
  onSeek: null,
};

ProgressSlider.propTypes = {
  onSeek: PropTypes.func,
};

export default ProgressSlider;
