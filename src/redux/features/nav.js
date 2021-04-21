import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const QUERY_SEARCH = 'nav/QUERY_SEARCH';

// actions
export const querySearch = createAsyncThunk(
  QUERY_SEARCH,
  async (value, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `search?query=${value}`, null, token);
  }
);

const initialState = {
  initialRoute: null,
  isSideMenuOpen: false,
  isMobile: false,
  searchResults: {
    media: [],
    users: [],
    albums: [],
  },
  forceClearSearch: false,
  showFooterPlayer: true,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setInitialNav: (state, action) => {
      state.initialRoute = action.payload;
    },
    toggleSideMenu: (state, action) => {
      state.isSideMenuOpen = action.payload;
    },
    toggleIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = initialState.searchResults;
      state.forceClearSearch = true;
    },
    toggleFooterPlayer: (state, action) => {
      state.showFooterPlayer = action.payload || !state.showFooterPlayer;
    },
  },
  extraReducers: {
    [querySearch.pending]: (state, action) => {
      state.querySearchPending = true;
      state.querySearchComplete = false;
      state.querySearchError = null;
      state.newMediaId = null;
    },
    [querySearch.fulfilled]: (state, action) => {
      state.querySearchPending = false;
      state.querySearchComplete = true;
      state.querySearchError = null;
      state.searchResults = action.payload;
      state.forceClearSearch = false;
    },
    [querySearch.rejected]: (state, action) => {
      state.querySearchPending = false;
      state.querySearchComplete = false;
      state.querySearchError = action.error;
      state.searchResults = {
        users: [],
        media: [],
        album: [],
      }
    },
  }
});

// actions
export const {
  setInitialNav,
  toggleSideMenu,
  toggleIsMobile,
  clearSearch,
  toggleFooterPlayer,
} = navSlice.actions;

// reducer
export default navSlice.reducer;

