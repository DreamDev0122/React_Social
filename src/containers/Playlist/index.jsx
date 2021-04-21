import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '$components/common/Button';
import Row from '$components/media/PlaylistRow';
import Tabs from '$components/common/Tabs';

import styles from './index.module.scss';

// options
const options = [
  { name: 'playlist', title: 'Playlist' },
];

const Playlist = () => {
  // state
  const [selected, setSelected] = useState(options[0].name);
  const [songs, setSongs] = useState([]);

  // store
  const { id } = useParams();
  const playlists = useSelector((store) => store.playlist.playlists);

  // effects
  useEffect(() => {
    const currentPlaylist = playlists.find((item) => item.playlist_id === id);
    setSongs(currentPlaylist && currentPlaylist.songs || []);
  }, [playlists, id]);

  // handlers
  const handlePlay = () => {
    console.log('play');
  }

  const handleShuffle = () => {
    console.log('shuffle');
  }

  // render
  return (
    <div className={styles.wrapper}>
      <Tabs
        options={options}
        onSelect={setSelected}
        selected={selected}
        name="viewPlaylist"
        activeColor="#8C8C8C"
      />
      <div className="d-flex justify-content-end align-items-center mt-4">
        <div className="mr-4">
          <Button
            onClick={handlePlay}
          >
            Play All
          </Button>
        </div>
        <Button
          onClick={handleShuffle}
          style={styles.shuffleBtn}
          icon="shuffle"
          isCustom
          hideDefault
        >
          Shuffle All
        </Button>
      </div>
      <div className="d-flex flex-column">
        {
          songs.map((song, idx) => (
            <Row
              key={`song-row-${idx}`}
              name={song.name}
              avatarUrl={song.cover_url}
              artistName={song.composer}
              mediaId={song.media_id}
              mediaUrl={song.media_url}
              recordLabel={song.recordLabel}
              playlistId={id}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Playlist;
