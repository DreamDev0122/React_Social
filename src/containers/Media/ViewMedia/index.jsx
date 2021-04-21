import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Row from '$components/media/CommentRow';
import Tabs from '$components/common/Tabs';
import Player from '$components/media/IndividualPlayer';
import VideoPlayer from '$components/media/VideoPlayer';

import {
  addComment,
  getComment,
  getRecommended,
  getMedia,
} from '$redux/features/media';

import styles from './index.module.scss';

const options = [
  { name: 'comments', title: 'Comments' },
  { name: 'description', title: 'Description' },
];

const field = {
  name: 'comments',
  type: 'area',
  placeholder: 'Comments',
  title: '',
};

const ViewMedia = () => {
  // state
  const [selected, setSelected] = useState(options[0].name);
  const [value, setValue] = useState('');

  // store
  const dispatch = useDispatch();
  const { id: mediaId } = useParams();

  const userId = useSelector((store) => store.authentication.user.user_id);
  const addCommentPending = useSelector((store) => store.media.addCommentPending);
  const addCommentComplete = useSelector((store) => store.media.addCommentComplete);
  const comments = useSelector((store) => store.media.comments);
  const currentMedia = useSelector((store) => store.media.currentMedia);

  // effects
  useEffect(() => {
    if (!mediaId) {
      return;
    }

    dispatch(getMedia(mediaId));
    dispatch(getComment(mediaId));
    dispatch(getRecommended(userId));
  }, [addCommentComplete, mediaId]);

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleChange = (name, value) => {
    setValue(value);
  }

  const handleAddComment = () => {
    dispatch(addComment({
      media_id: mediaId,
      user_id: userId,
      value,
    }));
  }

  const commentPane = (
    <div className={selected === 'comments' ? '' : 'd-none'}>
      <div className="d-flex align-items-center mt-4">
        <div className={styles.commentsWrapper}>
          <InputField
            field={{
              ...field,
              value,
            }}
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={handleAddComment}
          isLoading={addCommentPending}
          isCustom
          hideDefault
        >
          Comment
        </Button>
      </div>
      <div className="d-flex flex-column">
        {
          comments.map((comment, idx) => (
            <Row
              key={`comment-row-${idx}`}
              name={comment.commenter_name}
              date={comment.modified}
              value={comment.value}
              avatarUrl={comment.avatar_user_url}
            />
          ))
        }
      </div>
    </div>
  );

  const descriptionPane = (
    <div className={selected === 'description' ? '' : 'd-none'}>
      <div className={styles.descriptionWrapper}>
        {currentMedia.description}
      </div>
    </div>
  );

  // render
  return (
    <div className={styles.container}>
      {
        currentMedia.category === 'audio' ? (
          <Player
            mediaUrl={currentMedia.media_url}
            coverUrl={currentMedia.cover_url}
            avatarUrl={currentMedia.owner_avatar_url}
            title={currentMedia.name}
            artistName={currentMedia.owner_name}
            mediaId={currentMedia.media_id}
          />
        ) : (
          <VideoPlayer
            url={currentMedia.media_url}
          />
        )
      }
      <Tabs
        options={options}
        onSelect={handleSelect}
        selected={selected}
        name="viewMedia"
        activeColor="#EA4C89"
      />
      { commentPane}
      { descriptionPane}
    </div>
  );
}

export default ViewMedia;
