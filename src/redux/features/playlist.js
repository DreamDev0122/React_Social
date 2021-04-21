import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST';
const GET_PLAYLIST = 'playlist/GET_PLAYLIST';
const UPDATE_PLAYLIST = 'playlist/UPDATE_PLAYLIST';
const LIST_PLAYLIST = 'playlist/LIST_PLAYLIST';

// actions
export const createPlaylist = createAsyncThunk(
  CREATE_PLAYLIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'playlists', data, token);
  }
);

export const updatePlaylist = createAsyncThunk(
  UPDATE_PLAYLIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('PUT', `playlists/${data.playlistId}`, {
      owner_id: data.ownerId,
      song_id: data.mediaId,
    }, token);
  }
);

export const getPlaylist = createAsyncThunk(
  GET_PLAYLIST,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `playlists/${id}`, null, token);
  }
);

export const listPlaylist = createAsyncThunk(
  LIST_PLAYLIST,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `users/${id}/playlists`, null, token);
  }
);

const initialState = {
  createPlaylistPending: false,
  createPlaylistError: null,
  createPlaylistComplete: false,
  listPlaylistPending: false,
  listPlaylistError: null,
  listPlaylistComplete: false,
  getPlaylistPending: false,
  getPlaylistError: null,
  getPlaylistComplete: false,
  updatePlaylistPending: false,
  updatePlaylistError: null,
  updatePlaylistComplete: false,
  currentPlaylist: [],
  playlists: [],
};

// reducer
const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    updateLocalPlaylist(state, action) {
      state.currentPlaylist = [action.payload];
    },
    clearPlaylist(state) {
      state = initialState;
    },
  },
  extraReducers: {
    [createPlaylist.pending]: (state, action) => {
      state.createPlaylistPending = true;
      state.createPlaylistComplete = false;
      state.createPlaylistError = null;
    },
    [createPlaylist.fulfilled]: (state, action) => {
      state.createPlaylistPending = false;
      state.createPlaylistComplete = true;
      state.createPlaylistError = null;
    },
    [createPlaylist.rejected]: (state, action) => {
      state.createPlaylistPending = false;
      state.createPlaylistComplete = false;
      state.createPlaylistError = action.error;
    },
    [updatePlaylist.pending]: (state, action) => {
      state.updatePlaylistPending = true;
      state.updatePlaylistComplete = false;
      state.updatePlaylistError = null;
    },
    [updatePlaylist.fulfilled]: (state, action) => {
      state.updatePlaylistPending = false;
      state.updatePlaylistComplete = true;
      state.updatePlaylistError = null;
    },
    [updatePlaylist.rejected]: (state, action) => {
      state.updatePlaylistPending = false;
      state.updatePlaylistComplete = false;
      state.updatePlaylistError = action.error;
    },
    [getPlaylist.pending]: (state, action) => {
      state.getPlaylistPending = true;
      state.getPlaylistComplete = false;
      state.getPlaylistError = null;
    },
    [getPlaylist.fulfilled]: (state, action) => {
      state.getPlaylistPending = false;
      state.getPlaylistComplete = true;
      state.getPlaylistError = null;
      state.currentPlaylist = action.playlists;
    },
    [getPlaylist.rejected]: (state, action) => {
      state.getPlaylistPending = false;
      state.getPlaylistComplete = false;
      state.getPlaylistError = action.error;
    },
    [listPlaylist.pending]: (state, action) => {
      state.listPlaylistPending = true;
      state.listPlaylistComplete = false;
      state.listPlaylistError = null;
    },
    [listPlaylist.fulfilled]: (state, action) => {
      state.listPlaylistPending = false;
      state.listPlaylistComplete = true;
      state.listPlaylistError = null;
      state.playlists = action.payload.playlists;
    },
    [listPlaylist.rejected]: (state, action) => {
      state.listPlaylistPending = false;
      state.listPlaylistComplete = false;
      state.listPlaylistError = action.error;
    },
  }
});

export const { updateLocalPlaylist, clearPlaylist } = playlistSlice.actions

export default playlistSlice.reducer;

