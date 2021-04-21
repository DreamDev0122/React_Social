import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollMedia from '$components/media/ScrollMedia';
import Button from '$components/common/Button';
import { mediaSorter } from '$common/utils';

import styles from './index.module.scss';

const SearchResult = () => {
  // store
  const isMobile = useSelector((store) => store.nav.isMobile);
  const users = useSelector((store) => store.nav.searchResults.users);
  const media = useSelector((store) => store.nav.searchResults.media);
  const albums = useSelector((store) => store.nav.searchResults.albums);
  const querySearchPending = useSelector((store) => store.nav.querySearchPending);
  const querySearchComplete = useSelector((store) => store.nav.querySearchComplete);

  const [active, setActive] = useState('all');
  const [values, setValues] = useState({
    audio: [],
    video: [],
    movie: [],
  });

  useEffect(() => {
    setValues(mediaSorter(media));
  }, [media, users]);

  // handlers
  const handleAll = () => {
    setActive('all');
  }

  const handleMedia = () => {
    setActive('media');
  }

  const handleUsers = () => {
    setActive('users');
  }

  // render
  return (
    <div className={`d-flex flex-column ${styles.searchResultWrapper} ${isMobile ? styles.searchWrapperMobile : ''}`}>
      <div className="d-flex flex-wrap">
        <div className="mr-4 mb-4">
          <Button
            style={`${active !== 'all' ? styles.isNotActive : ''}`}
            onClick={handleAll}
          >
            All
          </Button>
        </div>
        <div className="mr-4">
          <Button
            style={`${active !== 'media' ? styles.isNotActive : ''}`}
            onClick={handleMedia}
          >
            Media
          </Button>
        </div>
        <Button
          style={`${active !== 'users' ? styles.isNotActive : ''}`}
          onClick={handleUsers}
        >
          Artists
        </Button>
      </div>
      {
        querySearchPending && <p className="pl-4">Searching...</p>
      }
      <div className={`${['all', 'users'].includes(active) ? '' : 'd-none'}`}>
        <ScrollMedia
          isLoading={querySearchPending}
          title="Artists"
          values={users}
          name="history-video"
          type="artist"
          showHeader
        />
      </div>
      <div className={`${['all', 'media'].includes(active) ? '' : 'd-none'}`}>
        <ScrollMedia
          isLoading={querySearchPending}
          title="Songs"
          values={values.audio}
          type="audio"
          name="search-audio"
          showHeader
        />
      </div>
      <div className={`${['all', 'media'].includes(active) ? '' : 'd-none'}`}>
        <ScrollMedia
          isLoading={querySearchPending}
          title="Videos"
          values={values.video}
          name="search-video"
          showHeader
        />
      </div>
      <div className={`${['all', 'media'].includes(active) ? '' : 'd-none'}`}>
        <ScrollMedia
          isLoading={querySearchPending}
          title="Movies"
          values={values.movie}
          name="search-movie"
          showHeader
        />
      </div>
    </div>
  );
}

export default SearchResult;

// line 89 needs update