import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '$components/common/Button';
import Social from '$components/common/Social';
import ScrollMedia from '$components/media/ScrollMedia';

import { handleFetch } from '$common/requestUtils';

import { showModal } from '$redux/features/modal';
import { getArtistById, getArtistMedia } from '$redux/features/artist';
import { addFollowers, removeFollowers } from '$redux/features/user';

import styles from './index.module.scss';

const shareIcon = require('$assets/images/icons/share.svg');
const defaultAvatar = require('$assets/images/profile-user.svg');

const Cover = styled.div`
  background-image: url(${props => props.source});
  background-color: #F7F5F5;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 100%;
`;

const Avatar = styled.div`
  background-image: url(${props => props.source});
  height: 110px;
  width: 110px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  background-color: #C1C1C1;
`;

const ViewArtist = () => {
  // store
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentArtist = useSelector((store) => store.artist.currentArtist);
  const token = useSelector((store) => store.authentication.token);
  const followers = useSelector((store) => store.authentication.user.followers);
  const artistsMedia = useSelector((store) => store.artist.artistsMedia);
  const getArtistMediaPending = useSelector((store) => store.artist.getArtistMediaPending);
  const isFavorite = followers.find((item) => item === id);

  const socialLinks = {
    fb: currentArtist.facebook_link,
    yt: currentArtist.youtube_link,
    instagram: currentArtist.instagram_link,
    twitter: currentArtist.instagram_link,
  };

  // state
  const [coverUrl, setCoverUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // effects
  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getArtistById(id));
    dispatch(getArtistMedia(id));
  }, [id]);

  useEffect(async () => {
    if (!currentArtist) {
      return;
    }

    if (currentArtist.avatar_url) {
      const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentArtist.avatar_url}`, null, token);
      setAvatarUrl(res.response);
    }

    if (currentArtist.cover_url) {
      const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentArtist.cover_url}`, null, token);
      setCoverUrl(res.response);
    }
  }, [currentArtist]);

  useEffect(() => {
    console.log('artistsMedia ', artistsMedia);
  }, [artistsMedia]);

  // handler
  const handleShare = () => {
    dispatch(showModal('SHARE_MODAL', {
      title: currentArtist.full_name,
      country: currentArtist.country,
      id: currentArtist.user_id,
      avatarUrl: avatarUrl,
      isArtist: true,
    }));
  }

  const handleFavorite = () => {
    const data = {
      follower_id: id,
    };

    if (isFavorite) {
      dispatch(removeFollowers(data));
    } else {
      dispatch(addFollowers(data));
    }
  }

  // render
  return (
    <div className={styles.artistViewContainer}>
      <div className={styles.artistCoverWrapper}>
        <Cover
          source={coverUrl}
        />
      </div>
      <div className={`row ${styles.artistHeaderWrapper}`}>
        <div className={`d-flex col-12 col-md-6 ${styles.artistHeaderInfopane}`}>
          <Avatar
            source={avatarUrl || defaultAvatar}
          />
          <div className="ml-4 mt-2">
            <p className={`${styles.artistTitle} mt-2`}>{currentArtist.full_name}</p>
            <span className={`d-none d-sm-block ${styles.artistSubtitle} pb-2`}>About</span>
          </div>
        </div>
        <div className={`d-flex col-12 col-md-6 ${styles.artistHeaderActionpane}`}>
          <Button
            onClick={handleFavorite}
          >
            {isFavorite ? 'Following' : 'Follow'}
          </Button>
          <Button
            onClick={handleShare}
            isTransparent
            noBorder
          >
            <img
              src={shareIcon}
              className={styles.artistActionIcon}
            />
          </Button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8">
          <div className="px-2">
            <p>{currentArtist.description}</p>
          </div>
          <Social
            links={socialLinks}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8">
          <ScrollMedia
            title="Media"
            values={artistsMedia}
            isLoading={getArtistMediaPending}
            name="view-artist"
            showHeader
          />
        </div>
      </div>
    </div>
  );
}

export default ViewArtist;
