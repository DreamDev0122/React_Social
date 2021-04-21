import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'

import PlayBtn from '$components/media/PlayBtn';
import Button from '$components/common/Button';
import ProgressSlider from '$components/media/ProgressSlider';
import VolumeSlider from '$components/media/VolumeSlider';

import { getFileURL } from '$common/utils';
import { toggleFooterPlayer } from '$redux/features/nav';
import { pause } from '$redux/features/player';

import styles from './index.module.scss';

const fullscreen = require('$assets/images/icons/fullscreen.svg');

const VideoPlayer = (props) => {
  // props
  const {
    file,
    url,
  } = props;

  const dispatch = useDispatch();

  const volume = useSelector((store) => store.player.volume);

  // state
  const [localUrl, setLocalUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // effects
  const playerRef = useRef(null);

  useEffect(() => {
    dispatch(toggleFooterPlayer(false));
    return () => {
      dispatch(toggleFooterPlayer(true));
    }
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }

    setLocalUrl(getFileURL(file));
  }, [file]);

  // handler
  const handleProgress = (data) => {
    setPosition(data.playedSeconds);
  }

  const handleSeek = (value) => {
    if (!playerRef.current) {
      return;
    }
    playerRef.current.seekTo(value);
  }

  const handleDuration = (dur) => {
    setDuration(dur);
  }

  const togglePlay = () => {
    dispatch(pause());
    setIsPlaying(!isPlaying);
  }

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(playerRef.current.wrapper);
    }
  }

  // render
  if (!url && !localUrl) {
    return null;
  }

  return (
    <>
      <div className={styles.playerWrapper}>
        <div className={styles.reactPlayer}>
          <ReactPlayer
            ref={playerRef}
            url={url || localUrl}
            playing={isPlaying}
            volume={volume}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onBuffer={() => setIsLoading(true)}
            onBufferEnd={() => setIsLoading(false)}
            onReady={() => setIsReady(true)}
            width='100%'
            height='100%'
          />
          {
            !isReady && (
              <div className={`d-flex justify-content-center align-items-center ${styles.videoCover}`}>
                <div
                  className={`spinner-border spinner-light ${styles.loader}`}
                  role="status"
                />
                <span className="mx-4">Loading...</span>
              </div>
            )
          }
        </div>
      </div>
      <div className={`d-flex ${styles.playerBar}`}>
        <Button
          onClick={togglePlay}
          isTransparent
          noBorder
        >
          <PlayBtn
            isPlaying={isPlaying}
            isLoading={isLoading}
          />
        </Button>
        <ProgressSlider
          position={position}
          duration={duration}
          progressInterval={250}
          onSeek={handleSeek}
        />
        <div className="mx-2">
          <VolumeSlider
            position={volume}
            setVolume
          />
        </div>
        <div>
          <Button
            onClick={handleFullScreen}
            isTransparent
            noBorder
          >
            <img
              className={styles.fullscreen}
              src={fullscreen}
              alt=""
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
