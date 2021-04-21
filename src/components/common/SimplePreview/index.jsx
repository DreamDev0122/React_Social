import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { handleFetch } from '$common/requestUtils';

import styles from './index.module.scss';

const singer = require('$assets/images/singer.svg');

const SimplePreview = (props) => {
  // props
  const {
    description,
    url,
    isRounded,
    handleClick,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);

  // state
  const [avatarUrl, setAvatarUrl] = useState('');

  // effects
  useEffect(async () => {
    if (!url) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${url}`, null, token);
    setAvatarUrl(res.response);
  }, [url]);

  // render
  return (
    <div
      onClick={handleClick}
      className={styles.preview}
    >
      <div className={`${styles.preview} ${isRounded ? styles.previewRounded : ''}`}>
        <img
          src={avatarUrl || singer}
          className={styles.img}
        />
      </div>
      <p>{description}</p>
    </div>
  );
}

SimplePreview.defaultProps = {
  url: null,
  description: 'Lorem ipsum dolor sit, amet',
  isRounded: false,
};

SimplePreview.propTypes = {
  url: PropTypes.string,
  description: PropTypes.string,
  isRounded: PropTypes.bool,
};

export default SimplePreview;
