import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Tabs from '$components/common/Tabs';

import { createPlaylist, updatePlaylist } from '$redux/features/playlist';

import styles from './index.module.scss';

const options = [
  { name: 'existing', title: 'Existing Playlist' },
  { name: 'new', title: 'New Playlist' },
];

const field = {
  name: 'title',
  type: 'text',
  placeholder: 'Playlist Name',
  title: '',
};

const PlaylistMenu = (props) => {
  // props
  const { title, mediaId } = props;

  // store
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const createPlaylistPending = useSelector((store) => store.playlist.createPlaylistPending);
  const updatePlaylistPending = useSelector((store) => store.playlist.updatePlaylistPending);
  const playlists = useSelector((store) => store.playlist.playlists);

  // state
  const [selected, setSelected] = useState(options[0].name);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState('');


  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleSuccess = (msg) => {
    setMessage({
      content: msg || 'Playlist successfully added!',
      type: 'success',
    });
  }

  const handleError = (msg) => {
    setMessage({
      content: msg || 'Incorrect playlist name!',
      type: 'error',
    });
  }

  const handleAddPlaylist = async () => {
    if (!value) {
      handleError('Playlist name missing!');
      return;
    }

    try {
      await dispatch(createPlaylist({
        name: value,
        owner_id: userId,
      }));

      handleSuccess('Playlist successfully added!');
    } catch (error) {
      // show error
      handleError();
    }
  };

  const handleUpdate = async (playlistId, status) => {
    setCurrentPlaylist(playlistId);

    try {
      await dispatch(updatePlaylist({
        playlistId,
        mediaId,
        ownerId: userId,
      }));
      setCurrentPlaylist('');

      handleSuccess(`Song was successfully ${status ? 'removed!' : 'added!'}`);
    } catch (error) {
      // show error
      handleError('Error. Please try again!');
    }
  }

  const onChange = (name, value) => {
    if (message) {
      setMessage(null);
    }
    setValue(value);
  }

  const newPlaylistPanel = (
    <div className="d-flex">
      <div className={styles.inputWrapper}>
        <InputField
          field={{
            ...field,
            value,
          }}
          onChange={onChange}
        />
      </div>
      <Button
        onClick={handleAddPlaylist}
        isLoading={createPlaylistPending}
        isCustom
        hideDefault
      >
        Add Playlist
      </Button>
    </div>
  );

  const existingPanel = (
    <div className="d-flex flex-column">
      <InputField
        field={{
          ...field,
          placeholder: 'Existing Playlist',
          value,
        }}
        onChange={onChange}
      />
      {
        playlists.map((item, idx) => {
          const status = item.songs.find((song) => song.media_id === mediaId);
          return (
            <div
              className="d-flex justify-content-between my-2"
              key={`playlist-existing-${idx}`}
            >
              <div>
                <span>{item.name}</span>
              </div>
              <Button
                onClick={() => handleUpdate(item.playlist_id, status)}
                isLoading={updatePlaylistPending && currentPlaylist === item.playlist_id}
                hideDefault
                isCustom
              >
                {
                  status ?
                    'Remove From Playlist' :
                    'Add to Playlist'
                }
              </Button>
            </div>
          )
        })
      }
    </div>
  );

  const buildContent = () => {
    if (!mediaId) {
      return newPlaylistPanel;
    }

    return (
      <>
        <Tabs
          options={options}
          onSelect={handleSelect}
          selected={selected}
          name="newItem"
          activeColor="#8C8C8C"
        />
        {
          selected === 'new' ?
            newPlaylistPanel :
            existingPanel
        }
      </>
    );
  }

  // render
  return (
    <div className={styles.wrapper}>
      {
        message && (
          <Alert
            content={message.content}
            type={message.type}
          />
        )
      }
      <div className={styles.container}>
        {buildContent()}
      </div>
    </div>
  );
}

export default PlaylistMenu;
