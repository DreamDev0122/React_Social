import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ActionHeader from '$components/media/ActionHeader';
import PlayBtn from '$components/media/PlayBtn';

import { handleFetch } from '$common/requestUtils';
import { routePaths } from '$common/routeConfig';

import { loadMedia } from '$redux/features/player';

import styles from './index.module.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');

const commonStyle = `
  background-repeat: no-repeat;
  background-position: center;
`;

const FeatureBkg = styled.div`
  ${commonStyle}
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: 100%;
  background-image: url(${props => props.source}); 
  mix-blend-mode: multiply;
`;

const FeatureAvatar = styled.div`
  ${commonStyle}
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-right: 10px;
  background-size: cover;
  background-image: url(${props => props.source}); 
`;

const Feature = (props) => {
  // props
  const {
    avatar,
    source,
    subtitle,
    title,
    mediaUrl,
    mediaId,
    artistId,
    country,
    category,
    showHeader,
  } = props;

  // store
  const userToken = useSelector((store) => store.authentication.token);
  const visitorToken = useSelector((store) => store.authentication.visitorToken);
  const currentMediaId = useSelector((store) => store.player.currentMediaId);
  const isLoading = useSelector((store) => store.player.isLoading);
  const isPlaying = useSelector((store) => store.player.isPlaying);

  const dispatch = useDispatch();
  const history = useHistory();

  const token = userToken || visitorToken;

  // state
  const [avatarUrl, setAvatarUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  // ref
  const isMounted = useRef(false);

  // effects
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(async () => {
    if (!token || !isMounted.current) {
      return;
    }

    handleFetch('GET', `media/presigned-get-url?file_name=${source}`, null, token)
      .then((res) => {
        if (!isMounted.current) {
          return;
        }
        setSourceUrl(res.response);
      });
    handleFetch('GET', `media/presigned-get-url?file_name=${avatar}`, null, token)
      .then((res) => {
        if (!isMounted.current) {
          return;
        }
        setAvatarUrl(res.response);
      });
  }, [token, avatar]);

  // handlers
  const handlePlay = async () => {
    if (category !== 'audio') {
      handleView();
      return;
    }

    dispatch(loadMedia({
      mediaId,
      url: mediaUrl,
      howl: null,
      avatar: avatarUrl,
      name: title,
      artistName: subtitle,
    }));
  }

  const handleView = () => {
    history.push(generatePath(routePaths.viewMedia, { id: mediaId }));
  }

  const handleArtistView = () => {
    history.push(generatePath(routePaths.viewArtist, { id: artistId }));
  }

  // render
  return (
    <div className={styles.featureWrapper}>
      <FeatureBkg source={avatarUrl} />
      {
        showHeader && (
          <div className={`d-flex justify-content-between mt-2 px-2 ${styles.featureHeaderWrapper}`}>
            <div className={`px-2 ${styles.featureHeaderWrapperTitle}`}>FEATURE</div>
            <ActionHeader
              mediaId={mediaId}
              country={country}
              title={title}
              avatarUrl={avatarUrl}
              showPlaylist
            />
          </div>
        )
      }
      <div className={`d-flex ${styles.featurePane}`}>
        <div onClick={handleArtistView}>
          {
            source ? (
              <FeatureAvatar
                source={sourceUrl}
              />
            ) : (
                <img
                  src={defaultAvatar}
                  className={styles.defaultFeatureAvatar}
                />
              )
          }
        </div>
        <div className={styles.featureContentWrapper}>
          <div className="d-flex">
            <button
              className={styles.featurePlayBtn}
              onClick={handlePlay}
            >
              <PlayBtn
                isLoading={isLoading && currentMediaId === mediaId}
                isPlaying={isPlaying && currentMediaId === mediaId}
              />
            </button>
            <div className={`d-flex flex-column ${styles.featureSummary}`}>
              <span onClick={handleView}>{title}</span>
              <span className={styles.subtitle} onClick={handleArtistView}>{subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Feature.defaultProps = {
  country: '',
  mediaId: null,
  artistId: null,
  mediaUrl: '',
  showHeader: true,
}

Feature.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mediaUrl: PropTypes.string,
  mediaId: PropTypes.string,
  country: PropTypes.string,
  artistId: PropTypes.string,
  showHeader: PropTypes.bool,
}

export default Feature;
