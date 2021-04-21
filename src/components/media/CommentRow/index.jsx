import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { handleFetch } from '$common/requestUtils';
import { formatDate } from '$common/utils';

import styles from './index.module.scss';

const Avatar = styled.div`
  background-image: url(${props => props.source});
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #727C7C;
`;

const CommentRow = (props) => {
  // props
  const {
    name,
    date,
    value,
    avatarUrl,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);

  // state
  const [url, setUrl] = useState(null);

  // effects
  useEffect(async () => {
    if (!avatarUrl) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatarUrl}`, null, token);
    setUrl(res.response);
  }, [avatarUrl]);

  // render
  return (
    <div className={`d-flex ${styles.row}`}>
      <Avatar
        source={url}
      />
      <div className="d-flex flex-column ml-4">
         <p className={styles.text}>{name} <span className={styles.date}>{formatDate(date)}</span></p>
         <p className={styles.text}>{value}</p>
      </div>
    </div>
  );
} 

export default CommentRow;
