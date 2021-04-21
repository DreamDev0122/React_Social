import {Howl, Howler} from 'howler';

import { shuffleArray } from './utils';

// https://github.com/goldfire/howler.js/blob/master/examples/player/player.js
// for reference

/**
 * @param {Array} playlist Array of objects with playlist song details ({ title, file, howl }).
 */

class Player {
  constructor(playlist, callbacks, onAutoPlay) {
    this.playlist = [...playlist] || [];
    this.originalPlaylist = [...playlist] || [];
    this.callbacks = callbacks || {};
    this.onAutoPlay = onAutoPlay || false;
    this.isPlaying = false;
    this.isOnRepeat = false;
    this.isOnShuffle = false;
    this.index = 0;
  }

  updatePlaylist(playlist) {
    if (this.playlist[this.index]
      && this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }
    
    this.playlist = playlist;
    this.index = 0;
  }

  canPlay(idx) {
    return this.playlist && this.playlist[idx || this.index];
  }

  play(idx) {
    let sound;
    let index = typeof idx === 'number' ? idx : this.index;
    const data = this.playlist[index];

    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.url],
        loop: false,
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: () => {
          if (this.callbacks.onPlay) {
            this.callbacks.onPlay(sound.duration(), this.playlist[index].mediaId);
          }
          this.isPlaying = false;
        },
        onload: () => {
          if (this.callbacks.onLoad) {
            this.callbacks.onLoad(this.playlist[index].mediaId);
          }
        },
        onend: () => {
          if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
          }

          if (this.isOnRepeat) {
            // play(this.index);
            return;
          }

          if (this.onAutoPlay) {
            this.skip('next');
            return;
          }
          this.isPlaying = false;
        },
        onpause: () => {
          if (this.callbacks.onPause) {
            this.callbacks.onPause();
          }
          this.isPlaying = false;
        },
        onstop: () => {
          if (this.callbacks.onStop) {
            this.callbacks.onStop();
          }
          this.isPlaying = false;
        },
        onseek: (value) => {
          if (this.callbacks.onSeek) {
            this.callbacks.onSeek(value);
          }
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Keep track of the index we are currently playing.
    this.index = index;
  }

  /**
   * Pause the currently playing track.
   */
  pause() {
    if (!this.playlist[this.index]) {
      return;
    }

    const sound = this.playlist[this.index].howl;
    if (sound) {
      sound.pause();
    }
    this.isPaused = true;
  }

  skip(direction) {
    if (direction === 'prev') {
      const idx = this.index === 0 ? this.playlist.length - 1 : this.index - 1;
      this.skipTo(idx);
      return;
    }

    const idx = (this.index >= this.playlist.length - 1) ? 0 : this.index + 1;
    this.skipTo(idx);
  }

  repeat() {
    this.isOnRepeat = !this.isOnRepeat;
  }

  shuffle() {
    if (!this.isOnShuffle) {
      this.playlist = shuffleArray([...this.originalPlaylist]);
    } else {
      this.playlist = [...this.originalPlaylist];
    }
    
    this.isOnShuffle = !this.isOnShuffle;
  }

  skipTo(index) {
    // Stop the current track.
    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop();
    }

    // Play the new track.
    this.play(index);
  }

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume(value) {
    // Update the global volume (affecting all Howls).
    Howler.volume(value);
  }

  /**
   * Seek to a new position in the currently playing track.
   * @param {Number} per Percentage through the song to skip.
   */
  seek(pos) {
    // Get the Howl we want to manipulate.
    if (!this.playlist[this.index]) {
      return;
    }

    const sound = this.playlist[this.index].howl;
    if (!sound) { // sound not found
      return;
    }
    // Convert the percent into a seek position.
    sound.seek(sound.duration() * pos);
  }
} 

export default Player;

