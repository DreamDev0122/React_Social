import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Tabs from '$components/common/Tabs';
import LineChart from '$components/common/LineChart';
import Table from '$components/common/Table';

import { kFormatter } from '$common/utils';
import { getInsight } from '$redux/features/artist';
import { getSystemInsight, searchUsers } from '$redux/features/user';

import styles from './index.module.scss';

const options = [
  { name: 'insights', title: 'Insights' },
];

const systemOptions = [
  { name: 'system', title: 'System Insights' },
];

const getSum = (data) => {
  return data.reduce((acc, curr) => acc + parseInt(curr), 0);
}

const Insights = () => {
  // state
  const [selected, setSelected] = useState('insights');

  // store
  const dispatch = useDispatch();
  const followers = useSelector((store) => store.authentication.user.followers);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const userType = useSelector((store) => store.authentication.user.user_type);
  const data = useSelector((store) => store.artist.insights);
  const systemData = useSelector((store) => store.user.insights);
  const users = useSelector((store) => store.user.users.data);

  const isSuperAdmin = userType === 'super admin';

  // effects
  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getInsight(userId));
    dispatch(searchUsers());
    // dispatch 
  }, [userId]);

  useEffect(() => {
    if (!isSuperAdmin) {
      return;
    }
    dispatch(getSystemInsight());
    setSelected('system');
  }, [isSuperAdmin]);

  // handlers
  const buildPane = (name, value) => (
    <div className={`d-flex flex-column text-center ${styles.bubbleWrapper}`}>
      <p className={styles.bubbleTitle}>{name}</p>
      <div className={`d-flex justify-content-center align-items-center ${styles.bubble}`}>
        <span>{value}</span>
      </div>
    </div>
  );

  const systemPanel = (
    <>
      <div className="d-flex flex-column">
        <span className={styles.title}>
          {kFormatter(getSum([
            systemData.artists,
            systemData.publishers,
            systemData.listeners])) || 0} Users
        </span>
        <div className={styles.titleBorder} />
      </div>
      <div className={`d-flex flex-wrap ${styles.dataWrapper} mb-4`}>
        {buildPane('Artists', kFormatter(systemData.artists || 0))}
        {buildPane('Publishers', kFormatter(systemData.publishers || 0))}
        {buildPane('Listeners', kFormatter(systemData.listeners || 0))}
      </div>
      <Table
        data={users || []}
      />
    </>
  );

  const insightsPanel = (
    <>
      <div className="d-flex flex-column">
        <span className={styles.title}>{data.plays || 0} Plays</span>
        <div className={styles.titleBorder} />
      </div>
      <div className="mt-4 pt-4">
        <LineChart />
      </div>
      <div className={`d-flex flex-wrap ${styles.dataWrapper}`}>
        {buildPane('Shares', kFormatter(data.shares || 0))}
        {buildPane('Comments', kFormatter(data.comments || 0))}
        {buildPane('Followers', kFormatter(followers.length || 0))}
      </div>
    </>
  );

  // render
  return (
    <div className={styles.container}>
      <div className={styles.tabsWrapper}>
        <Tabs
          onSelect={setSelected}
          selected={selected}
          options={ isSuperAdmin ? systemOptions : options}
          name="insightsTab"
          activeColor="#EA4C89"
        />
      </div>
      <div className="row">
        <div className="col-12 col-md-10 offset-md-1">
          {
            isSuperAdmin ?
              systemPanel :
              insightsPanel
          }
        </div>
      </div>
    </div>
  );
}

export default Insights;
