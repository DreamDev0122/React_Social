import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollMedia from '$components/media/ScrollMedia';
import { mediaSorter } from '$common/utils';

import styles from './index.module.scss';

const Favorites = () => {
  // store
  const favorites = useSelector((store) => store.authentication.user.favourites);
  // state
  const [values, setValues] = useState({});

  // effects
  useEffect(() => {
    setValues(mediaSorter(favorites));
  }, [favorites]);

  // render
  return (
    <div className={`${styles.homeContent} ${styles.favoritesContentTop}`}>
      <p className={`${styles.homeHeading} py-4`}>Favorites</p>
      <ScrollMedia
        title="Songs"
        values={values.audio}
        name="favorite-songs"
        type="audio"
        showHeader
      />
      <ScrollMedia
        title="Videos"
        values={values.video}
        name="favorite-video"
        showHeader
      />
      <ScrollMedia
        title="Movies"
        values={values.movie}
        name="favorite-movie"
        showHeader
      />
    </div>
  );
}

export default Favorites;
