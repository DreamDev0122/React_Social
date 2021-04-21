import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ScrollMedia from '$components/media/ScrollMedia';
import { mediaSorter } from '$common/utils';

import styles from './index.module.scss';

const History = () => {
  // store
  const userHistory = useSelector((store) => store.user.history);
  const getHistoryPending = useSelector((store) => store.user.getHistoryPending);

  // state
  const [values, setValues] = useState({});

  // effects
  useEffect(() => {
    setValues(mediaSorter(userHistory));
  }, [userHistory]);

  // render
  return (
    <div className={`${styles.homeContent} ${styles.historyContentTop}`}>
      <p className={`${styles.homeHeading} py-4`}>History</p>
      <ScrollMedia
        title="Songs"
        isLoading={getHistoryPending}
        values={values.audio}
        name="history-songs"
        type="audio"
        showHeader
      />
      <ScrollMedia
        isLoading={getHistoryPending}
        title="Videos"
        values={values.video}
        name="history-video"
        showHeader
      />
      <ScrollMedia
        isLoading={getHistoryPending}
        title="Movies"
        values={values.movie}
        name="history-movie"
        showHeader
      />
    </div>
  );
}

export default History;