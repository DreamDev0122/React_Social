import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const LOAD_MEDIA = 'player/LOAD_MEDIA';

const INITIAL_STATE = {
  currentMediaId: null,
  isPlaying: false,
  currentPlaylist: [],
  isAutoPlay: false,
  isRepeat: false,
  isShuffle: false,
  isLoading: false,
  position: 0,
  duration: 0,
  volume: 1,
  newPosition: -1,
};

const playerSlider = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentMediaId(state, action) {
      state.currentMediaId = action.payload;
    },
    pause(state) {
      state.isPlaying = false;
    },
    seek(state, action) {
      state.newPosition = action.payload;
    },
    play(state, action) {
      if (action.payload) {
        state.currentMediaId = action.payload.mediaId; // TODO: media id fix
        state.currentPlaylist = [action.payload];
      }
      state.isPlaying = true;
    },
    goPrev(state, action) {
      // handle prev
    },
    goNext(state, action) {
      // handle prev
    },
    updateVolume(state, action) {
      state.volume = action.payload;
    },
    updateRange(state, action) {
      state.position = action.payload;
    },
    updateDuration(state, action) {
      state.duration = action.payload;
    },
    updateLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentMediaId,
  play,
  pause,
  seek,
  updateRange,
  updateLoading,
  updateDuration,
  updateVolume,
} = playerSlider.actions;

// actions
export const loadMedia = createAsyncThunk(
  LOAD_MEDIA,
  async (data, param) => {
    const { currentMediaId, isPlaying } = param.getState().player;

    if (currentMediaId === data.mediaId) {
      if (isPlaying) {
        param.dispatch(pause());
        return;
      }
      param.dispatch(play());
      return;
    }

    param.dispatch(updateLoading(true));
    param.dispatch(setCurrentMediaId(data.mediaId));
    const { token } = param.getState().authentication;
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${data.url}`, null, token);
    param.dispatch(play({
      ...data,
      url: res.response,
    }));
  }
);

export default playerSlider.reducer;