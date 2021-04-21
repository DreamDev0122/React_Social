import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Scroller from '$components/common/Scroller';
import Preview from '$components/common/Preview';
import Feature from '$components/common/Feature';
import SimplePreview from '$components/common/SimplePreview';

const ScrollMedia = (props) => {
  // props
  const {
    values,
    title,
    isLoading,
    type,
    name,
  } = props;

  const getMedia = useCallback((item, idx) => {
    if (type === 'audio') {
      return (
        <Feature
          key={`feature-home-songs-${idx}`}
          mediaUrl={item.media_url}
          mediaId={item.media_id}
          avatar={item.cover_url}
          artistId={item.owner_id}
          source={item.owner_avatar_url}
          subtitle={item.owner_name}
          title={item.name}
          country={item.country}
          category={item.category}
        />
      );
    }

    if (type === 'artist') {
      return (
        <SimplePreview
          description={item.full_name}
          url={item.avatar_url}
          handleClick={() => null}
          isRounded
        />
      )
    }

    return (
      <Preview
        key={`scroll-${idx}-home-${item.name}`}
        title={item.name}
        mediaId={item.media_id}
        description={item.description}
        source={item.cover_url}
      />
    );
  }, [type]);

  // render
  return (
    <Scroller
      isLoading={isLoading}
      title={title}
      showHeader={!!title}
      total={values.length}
      name={name}
    >
      {
        values.map((item, idx) => getMedia(item, idx))
      }
    </Scroller>
  );
}

ScrollMedia.defaultProps = {
  values: [],
  title: '',
  isLoading: false,
  type: 'audio',
};

ScrollMedia.propTypes = {
  values: PropTypes.array,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};



export default ScrollMedia;

