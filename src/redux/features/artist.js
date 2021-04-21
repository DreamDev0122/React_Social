import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const ADD_ARTIST = 'artist/ADD_ARTIST';
const GET_ARTISTS = 'artist/GET_ARTISTS';
const GET_ARTIST_BY_ID = 'artist/GET_ARTIST_BY_ID';
const GET_INSIGHT = 'artist/GET_INSIGHT';
const GET_ARTIST_MEDIA = 'artist/GET_ARTIST_MEDIA';

// actions
export const addArtist = createAsyncThunk(
  ADD_ARTIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'artists', data, token);
  }
);

export const getArtistMedia = createAsyncThunk(
  GET_ARTIST_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `users/${id}/media`, null, token);
  }
);

export const getArtists = createAsyncThunk(
  GET_ARTISTS,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', 'artists', null, token);
  }
);

export const getArtistById = createAsyncThunk(
  GET_ARTIST_BY_ID,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `users/${id}`, null, token);
  }
);

export const getInsight = createAsyncThunk(
  GET_INSIGHT,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `artists/${id}/insights`, null, token);
  }
);

const initialState = {
  addArtistPending: false,
  addArtistError: null,
  addArtistComplete: false,
  getArtistsPending: false,
  getArtistsComplete: false,
  getArtistMediaPending: false,
  getArtistMediaComplete: false,
  getArtistMediaError: false,
  getInsightPending: false,
  getInsightComplete: false,
  getInsightError: null,
  getArtistsError: null,
  newArtistId: '',
  artists: [],
  getArtistByIdPending: false,
  getArtistByIdComplete: false,
  getArtistByIdError: null,
  currentArtist: {},
  insights: {},
  artistsMedia: [],
};

// slice
const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    clearArtist(state) {
      state = initialState;
    },
  },
  extraReducers: {
    [addArtist.pending]: (state, action) => {
      state.addArtistPending = true;
      state.addArtistComplete = false;
      state.addArtistError = null;
    },
    [addArtist.fulfilled]: (state, action) => {
      state.addArtistPending = false;
      state.addArtistComplete = true;
      state.addArtistError = null;
      state.newArtistId = action.payload.user_id;
    },
    [addArtist.rejected]: (state, action) => {
      state.addArtistPending = false;
      state.addArtistError = action.error;
    },
    [getArtists.pending]: (state, action) => {
      state.getArtistsPending = true;
      state.getArtistsComplete = false;
      state.getArtistsError = null;
    },
    [getArtists.fulfilled]: (state, action) => {
      state.getArtistsPending = false;
      state.getArtistsComplete = true;
      state.getArtistsError = null;
      state.artists = action.payload;
    },
    [getArtists.rejected]: (state, action) => {
      state.getArtistsPending = false;
      state.getArtistsComplete = false;
      state.getArtistsError = action.error;
    },
    [getArtistMedia.pending]: (state, action) => {
      state.getArtistMediaPending = true;
      state.getArtistMediaComplete = false;
      state.getArtistMediaError = null;
    },
    [getArtistMedia.fulfilled]: (state, action) => {
      state.getArtistMediaPending = false;
      state.getArtistMediaComplete = true;
      state.getArtistMediaError = null;
      state.artistsMedia = action.payload.media.data;
    },
    [getArtistMedia.rejected]: (state, action) => {
      state.getArtistMediaPending = false;
      state.getArtistMediaComplete = false;
      state.getArtistMediaError = action.error;
    },
    [getArtistById.pending]: (state, action) => {
      state.getArtistByIdPending = true;
      state.getArtistByIdComplete = false;
      state.getArtistByIdError = null;
    },
    [getArtistById.fulfilled]: (state, action) => {
      state.getArtistByIdPending = false;
      state.getArtistByIdComplete = true;
      state.getArtistByIdError = null;
      state.currentArtist = action.payload.user;
    },
    [getArtistById.rejected]: (state, action) => {
      state.getArtistByIdPending = false;
      state.getArtistByIdComplete = false;
      state.getArtistByIdError = action.error;
    },
    [getInsight.pending]: (state, action) => {
      state.getInsightPending = true;
      state.getInsightComplete = false;
      state.getInsightError = null;
    },
    [getInsight.fulfilled]: (state, action) => {
      state.getInsightPending = false;
      state.getInsightComplete = true;
      state.getInsightError = null;
      state.insights = action.payload
    },
    [getInsight.rejected]: (state, action) => {
      state.getInsightPending = false;
      state.getInsightComplete = false;
      state.getInsightError = action.error;
    },
  }
});

export const { clearArtist } = artistSlice.actions;
export default artistSlice.reducer;

