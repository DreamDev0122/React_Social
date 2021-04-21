import React from 'react';
import { useDispatch } from 'react-redux';

import Preview from '$components/common/Preview';
import { showModal } from '$redux/features/modal';

const TopPreview = (props) => {
  // props
  const {
    values,
    isLoading,
  } = props;

  // store
  const dispatch = useDispatch();

  // handlers
  const handleClick = () => {
    dispatch(showModal('ALERT_MODAL'));
  }

  // render
  return (
    <div>
      {
        isLoading && (
          <p className="text-center">
            Loading ...
          </p>
        )
      }
      {
        values.map((item, idx) => (
          <Preview
            key={`${item.media_id}-${idx}`}
            {...item}
            onClick={handleClick}
            source={item.cover_url}
            title={item.title || item.name}
            hideHeader
          />
        ))
      }
    </div>
  );
}

export default TopPreview;
