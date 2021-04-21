import React from 'react';
import PropTypes from 'prop-types';

import Share from '$components/common/Share';

import styles from './index.module.scss';

const ShareModal = (props) => {
  // props
  const {
    id,
    title, 
    country,
    avatarUrl,
    isArtist,
    isAvatarLoaded,
  } = props;

  const param = isArtist ? 'artist' : 'media';

  // render
  return (
    <div className={styles.shareModalWrapper}>
      <Share
        name={title}
        country={country}
        link={`https://mkondo.co/app/${param}/${id}`}
        avatar={avatarUrl}
        initialDescription={`Checkout this ${param} hosted at www.mkondo.co`}
        isAvatarLoaded={isAvatarLoaded}
        id={id}
      />
    </div>
  );
}

ShareModal.defaultProps  = {
  isArtist: false,
  country: '',
  avatarUrl: '',
  isAvatarLoaded: true,
}

ShareModal.propTypes  = {
  title: PropTypes.string.isRequired, 
  id: PropTypes.string.isRequired,
  isArtist: PropTypes.bool,
  country: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  isAvatarLoaded: PropTypes.bool,
}

export default ShareModal;
