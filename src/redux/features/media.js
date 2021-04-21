import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { handleFetch, buildFormData } from '$common/requestUtils';

const ADD_MEDIA = 'media/ADD_MEDIA';
const GET_ALL_MEDIA = 'media/GET_ALL_MEDIA';
const SAVE_MEDIA = 'media/SAVE_MEDIA';
const GET_MEDIA = 'media/GET_MEDIA';
const UPDATE_MEDIA = 'media/UPDATE_MEDIA';
const GET_NEW_RELEASES = 'media/GET_NEW_RELEASES';
const UPDATE_SHARE_COUNT = 'media/UPDATE_SHARE_COUNT';
const ADD_ALBUM = 'media/ADD_ALBUM';
const GET_ALBUMS = 'media/GET_ALBUMS';
const ADD_COMMENT = 'media/ADD_COMMENT';
const GET_COMMENT = 'media/GET_COMMENT';
const GET_RECOMENDED = 'media/GET_RECOMENDED';
const UPDATE_LIKE = 'media/UPDATE_LIKE';

// actions
export const addMedia = createAsyncThunk(
  ADD_MEDIA,
  async (data, param) => {
    const { token } = param.getState().authentication;
    if (data.file) {
      return await handleFetch('POST', 'media', data, token);
    }
    return await handleFetch('POST', 'media', data, token, '');
  }
);

export const getAllMedia = createAsyncThunk(
  GET_ALL_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', 'media', null, token);
  }
);

export const updateShareCount = createAsyncThunk(
  UPDATE_SHARE_COUNT,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', `media/${id}/shares`, null, token);
  }
);

export const getMedia = createAsyncThunk(
  GET_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `media/${id}`, null, token);
  }
);

export const getNewReleases = createAsyncThunk(
  GET_NEW_RELEASES,
  async (data, param) => {
    const { token, visitorToken } = param.getState().authentication;
    return await handleFetch('GET', `media/new-release?${queryString.stringify(data)}`, null, token || visitorToken);
  }
);

export const addAlbum = createAsyncThunk(
  ADD_ALBUM,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'albums', data, token);
  }
);

export const addComment = createAsyncThunk(
  ADD_COMMENT,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'comments', data, token);
  }
);

export const getComment = createAsyncThunk(
  GET_COMMENT,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `media/${id}/comments`, null, token);
  }
);

export const getRecommended = createAsyncThunk(
  GET_RECOMENDED,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `media/recommended/${id}/similar`, null, token);
  }
);

export const updateMedia = createAsyncThunk(
  UPDATE_MEDIA,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('PUT', `media/${data.id}`, data.payload, token);
  }
);

export const updateLike = createAsyncThunk(
  UPDATE_LIKE,
  async (mediaId, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', `media/${mediaId}/like`, null, token);
  }
);

// save to digital ocean spaces
export const saveMedia = createAsyncThunk(
  SAVE_MEDIA,
  async (file, param) => {
    const { token } = param.getState().authentication;
    const fileName = `${Math.random().toString(36).substring(5)}${file.name}`;
    const result = await handleFetch('GET', `media/presigned-post-url?file_name=${fileName}`, null, token);
    const { fields, url } = result.response;

    try {
      const { headers, body: formData } = buildFormData(url, {
        ...fields,
        file,
      });

      const res = await fetch(url, {
        method: 'POST',
        body: formData,
        headers,
      });

      await res.text();
      return fileName;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  addMediaPending: false,
  addMediaError: null,
  addMediaComplete: false,
  getMediaPending: false,
  getMediaComplete: false,
  getMediaError: null,
  saveMediaPending: false,
  saveMediaError: null,
  saveMediaComplete: false,
  newMediaId: null,
  getNewReleasesPending: false,
  getNewReleasesComplete: false,
  getNewReleasesError: null,
  updateShareCountPending: false,
  updateShareCountError: null,
  updateShareCountComplete: false,
  addAlbumPending: false,
  addAlbumError: null,
  addAlbumComplete: false,
  getCommentPending: false,
  getCommentError: null,
  getCommentComplete: false,
  addCommentPending: false,
  addCommentError: null,
  addCommentComplete: false,
  updateMediaPending: false,
  updateMediaError: null,
  updateMediaComplete: false,
  currentMedia: {
    media_id: null,
    name: '',
    cover_url: null,
    owner_avatar_url: null,
  },
  newReleases: {
    audio: [],
    video: [],
    movie: [],
  },
  albumId: null,
  comments: [],
  recommendedMedia: [],
  lastUploaded: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearNewMediaId(state) {
      state.newMediaId = null;
    },
    clearMedia(state) {
      state = initialState;
    }
  },
  extraReducers: {
    [addMedia.pending]: (state, action) => {
      state.addMediaPending = true;
      state.addMediaComplete = false;
      state.addMediaError = null;
      state.newMediaId = null;
      state.lastUploaded = null;
    },
    [addMedia.fulfilled]: (state, action) => {
      state.addMediaPending = false;
      state.addMediaComplete = true;
      state.addMediaError = null;
      state.newMediaId = action.payload.media_id; // Prepare Deprecation
      state.lastUploaded = {
        ...action.meta.arg,
        mediaId: action.payload.media_id,
      };
    },
    [addMedia.rejected]: (state, action) => {
      state.addMediaPending = false;
      state.addMediaComplete = false;
      state.addMediaError = action.error;
    },
    [getMedia.pending]: (state, action) => {
      state.getMediaPending = true;
      state.getMediaComplete = false;
      state.getMediaError = null;
    },
    [getMedia.fulfilled]: (state, action) => {
      state.getMediaPending = false;
      state.getMediaComplete = true;
      state.getMediaError = null;
      state.currentMedia = action.payload.media;
    },
    [getMedia.rejected]: (state, action) => {
      state.getMediaPending = false;
      state.getMediaComplete = true;
      state.getMediaError = action.error;
    },
    [updateShareCount.pending]: (state, action) => {
      state.updateShareCountPending = true;
      state.updateShareCountComplete = false;
      state.updateShareCountError = null;
    },
    [updateShareCount.fulfilled]: (state, action) => {
      state.updateShareCountPending = false;
      state.updateShareCountComplete = true;
      state.updateShareCountError = null;
    },
    [updateShareCount.rejected]: (state, action) => {
      state.updateShareCountPending = false;
      state.updateShareCountComplete = false;
      state.updateShareCountError = action.error;
    },
    [addAlbum.pending]: (state, action) => {
      state.addAlbumPending = true;
      state.addAlbumComplete = false;
      state.addAlbumError = null;
      state.albumId = null;
    },
    [addAlbum.fulfilled]: (state, action) => {
      state.addAlbumPending = false;
      state.addAlbumComplete = true;
      state.addAlbumError = null;
      state.albumId = action.payload.album_id;
    },
    [addAlbum.rejected]: (state, action) => {
      state.addAlbumPending = false;
      state.addAlbumComplete = false;
      state.addAlbumError = action.error;
    },
    [saveMedia.pending]: (state, action) => {
      state.saveMediaPending = true;
      state.saveMediaComplete = false;
      state.saveMediaError = null;
    },
    [saveMedia.fulfilled]: (state, action) => {
      state.saveMediaComplete = true;
      state.saveMediaError = null;
      state.saveMediaPending = false;
      state.media = action.payload;
    },
    [saveMedia.rejected]: (state, action) => {
      state.saveMediaComplete = false;
      state.saveMediaError = action.error;
      state.saveMediaPending = false;
    },
    [getRecommended.pending]: (state, action) => {
      state.getRecommendedPending = true;
      state.getRecommendedComplete = false;
      state.getRecommendedError = null;
    },
    [getRecommended.fulfilled]: (state, action) => {
      state.getRecommendedPending = false;
      state.getRecommendedComplete = true;
      state.getRecommendedError = null;
      state.recommendedMedia = action.payload;
    },
    [getRecommended.rejected]: (state, action) => {
      state.getRecommendedPending = false;
      state.getRecommendedComplete = false;
      state.getRecommendedError = action.error;
    },
    [getNewReleases.pending]: (state, action) => {
      state.getNewReleasesPending = true;
      state.getNewReleasesComplete = false;
      state.getNewReleasesError = null;
    },
    [getNewReleases.fulfilled]: (state, action) => {
      state.getNewReleasesPending = false;
      state.getNewReleasesComplete = true;
      state.getNewReleasesError = null;
      state.newReleases[action.meta.arg.category] = action.payload.media;
    },
    [getNewReleases.rejected]: (state, action) => {
      state.getNewReleasesPending = false;
      state.getNewReleasesComplete = true;
      state.getNewReleasesError = action.error;
    },
    [addComment.pending]: (state, action) => {
      state.addCommentPending = true;
      state.addCommentComplete = false;
      state.addCommentError = null;
    },
    [addComment.fulfilled]: (state, action) => {
      state.addCommentPending = false;
      state.addCommentComplete = true;
      state.addCommentError = null;
    },
    [addComment.rejected]: (state, action) => {
      state.addCommentPending = false;
      state.addCommentComplete = true;
      state.addCommentError = action.error;
    },
    [getComment.pending]: (state, action) => {
      state.getCommentPending = true;
      state.getCommentComplete = false;
      state.getCommentError = null;
      state.comments = [];
    },
    [getComment.fulfilled]: (state, action) => {
      state.getCommentPending = false;
      state.getCommentComplete = true;
      state.getCommentError = null;
      state.comments = action.payload.comments;
    },
    [getComment.rejected]: (state, action) => {
      state.getCommentPending = false;
      state.getCommentComplete = true;
      state.getCommentError = action.error;
    },
    [updateMedia.pending]: (state, action) => {
      state.updateMediaPending = true;
      state.updateMediaComplete = false;
      state.updateMediaError = null;
      state.comments = [];
    },
    [updateMedia.fulfilled]: (state, action) => {
      state.updateMediaPending = false;
      state.updateMediaComplete = true;
      state.updateMediaError = null;
    },
    [updateMedia.rejected]: (state, action) => {
      state.updateMediaPending = false;
      state.updateMediaComplete = true;
      state.updateMediaError = action.error;
    },
  }
});

export const { clearNewMediaId, clearMedia } = mediaSlice.actions;
export default mediaSlice.reducer;

