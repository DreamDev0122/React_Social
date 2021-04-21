import React from 'react';
import PropTypes from 'prop-types';

import Feature from '$components/common/Feature';

import styles from './index.module.scss';

const TopSongs = (props) => {
  // props
  const {
    media,
    isLoading,
    showHeader,
  } = props;

  // render
  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center flex-wrap">
          {
            isLoading && (
              <p className="text-center">
                <span
                  className="spinner-border spinner-border-lg text-light mr-2"
                  role="status"
                  aria-hidden="true"
                />
                Loading ...
              </p>
            )
          }
          {
           !isLoading &&
           media.length < 1 && (
              <p className={`mb-4 text-center ${styles.topSongsEmpty}`}>No Media Found!</p>
            )
          }
          {
            media.map((item, index) => (
              <Feature
                key={`feature-top-songs-${index}`}
                mediaUrl={item.media_url}
                mediaId={item.media_id}
                avatar={item.cover_url}
                artistId={item.owner_id}
                source={item.owner_avatar_url}
                subtitle={item.owner_name}
                title={item.name}
                country={item.country}
                category={item.category}
                showHeader={showHeader}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

TopSongs.defaultProps = {
  media: [],
  errorMsg: 'No new releases. Please try again later!',
  showHeader: true,
}

TopSongs.propTypes = {
  media: PropTypes.array,
  errorMsg: PropTypes.string,
  showHeader: PropTypes.bool,
}

export default TopSongs;
