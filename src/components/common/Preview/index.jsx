import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, generatePath } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ActionHeader from '$components/media/ActionHeader';

import { routePaths } from '$common/routeConfig';
import { handleFetch } from '$common/requestUtils';

import styles from './index.module.scss';

const playBtn = require('$assets/images/icons/play.svg');

const PreviewBkg = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 100ms ease-in-out;
  transform: scale(${props => props.isActive ? 1.3 : 1});
  transform-origin: center;
  background-image: url(${props => props.source});
  background-color: black;
`;

const Preview = (props) => {
  // props
  const {
    title,
    description,
    source,
    onClick,
    isAvatarLoaded,
    hideHeader,
    mediaId,
  } = props;

  // state
  const [isActive, setIsActive] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // props
  const token = useSelector((store) => store.authentication.token);
  const visitorToken = useSelector((store) => store.authentication.visitorToken);
  const history = useHistory();

  // effects
  useEffect(async () => {
    if (!source) {
      return;
    }

    if (isAvatarLoaded) {
      setAvatarUrl(source)
      return;
    }

    // TODO: use stage to determine and update the relevant token
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${source}`, null, token || visitorToken);
    setAvatarUrl(res.response);
  }, [source]);

  // handler
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    history.push(generatePath(routePaths.viewMedia, { id: mediaId }));
  }

  // render
  return (
    <div className={styles.temp}>
      <div
        className={styles.previewBkgWrapper}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <PreviewBkg
          source={avatarUrl}
          isActive={isActive}
        />
        {
          !hideHeader && (
            <div className={styles.header}>
              <ActionHeader
                title={title}
                mediaId={mediaId}
                avatarUrl={avatarUrl}
                country={description}
              />
            </div>
          )
        }
        <button
          className={styles.previewActionBtn}
          onClick={handleClick}
        >
          <img
            className={styles.previewActionIcon}
            src={playBtn}
          />
        </button>
      </div>
      {
        title && <p className={`${styles.title} text-left`}>{title}</p>
      }
      {
        description && <p className={`${styles.description} text-left`}>{description}</p>
      }
    </div>
  );
};

Preview.defaultProps = {
  title: null,
  description: null,
  onClick: null,
  isAvatarLoaded: false,
  hideHeader: false,
  mediaId: null,
};

Preview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  isAvatarLoaded: PropTypes.bool,
  hideHeader: PropTypes.bool,
  mediaId: PropTypes.string,
};

export default Preview;
