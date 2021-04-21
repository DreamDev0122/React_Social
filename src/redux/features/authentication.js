import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';
import { getUser, saveUser, clearUser } from '$common/userService';

const AUTHENTICATE = 'authentication/AUTHENTICATE';
const SIGN_UP = 'authentication/SIGN_UP';
const FORGOT_PASSWORD = 'authentication/FORGOT_PASSWORD';
const RESET_PASSWORD = 'authentication/RESET_PASSWORD';
const RELOAD_USER = 'authentication/RELOAD_USER';
const VISITOR_COLD_START = 'authentication/VISITOR_COLD_START';

// actions
export const login = createAsyncThunk(
  AUTHENTICATE,
  async (data) => {
    return await handleFetch('POST', 'users/authenticate', data);
  }
);

export const signup = createAsyncThunk(
  SIGN_UP,
  async (data) => {
    return await handleFetch('POST', 'users', data);
  }
);

export const forgotPassword = createAsyncThunk(
  FORGOT_PASSWORD,
  async (data) => {
    return await handleFetch('POST', 'users/forgotpassword', data);
  }
);

export const resetPassword = createAsyncThunk(
  RESET_PASSWORD,
  async (data) => {
    return await handleFetch('POST', 'users/password/reset', data);
  }
);

export const reloadUser = createAsyncThunk(
  RELOAD_USER,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `users/${id}`, null, token);
  }
);

export const visitorColdStart = createAsyncThunk(
  VISITOR_COLD_START,
  async () => {
    return await handleFetch('GET', `users/visitor-token`, null);
  }
);

// handlers
const handleAuthentication = (data) => {
  const { access_token, user } = data;
  saveUser(user, access_token);
  return {
    token: access_token,
    user,
  };
}

const initialState = {
  token: null,
  visitorToken: null,
  user: {
    full_name: null,
    user_id: null,
    publish: false,
    user_type: null,
  },
  loginPending: false,
  loginComplete: false,
  loginError: null,
  signupPending: false,
  signUpComplete: false,
  signupError: null,
  forgotPasswordPending: false,
  forgotPasswordComplete: false,
  forgotPasswordError: null,
  resetPasswordPending: false,
  resetPasswordComplete: false,
  resetPasswordError: null,
};

// reducers
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: () => {
      clearUser();
      return initialState;
    },
    coldstart: (state) => {
      const { token, user } = getUser();
      return {
        ...state,
        token,
        user: user || {
          ...initialState.user,
          user_type: 'visitor',
        },
        isVistor: false,
      }
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loginPending = true;
      state.loginComplete = false;
      state.loginError = null;
    },
    [login.fulfilled]: (state, action) => {
      return {
        ...state,
        ...handleAuthentication(action.payload),
        loginPending: false,
        loginError: false,
        loginComplete: true,
      };
    },
    [login.rejected]: (state, action) => {
      state.loginPending = false;
      state.loginError = action.error;
      state.loginComplete = false;
    },
    [signup.pending]: (state, action) => {
      state.signupPending = true;
      state.signupError = null;
      state.signUpComplete = false;
    },
    [signup.fulfilled]: (state, action) => {
      return {
        ...state,
        ...handleAuthentication(action.payload),
        signupPending: false,
        signUpComplete: true,
      };
    },
    [signup.rejected]: (state, action) => {
      state.signupPending = false;
      state.signupError = action.error;
      state.signUpComplete = false;
    },
    [forgotPassword.pending]: (state, action) => {
      state.forgotPasswordPending = true;
      state.forgotPasswordError = null;
      state.forgotPasswordComplete = false;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.forgotPasswordPending = false;
      state.forgotPasswordError = null;
      state.forgotPasswordComplete = true;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.forgotPasswordPending = false;
      state.forgotPasswordError = action.error;
      state.forgotPasswordComplete = false;
    },
    [resetPassword.pending]: (state, action) => {
      state.resetPasswordPending = true;
      state.resetPasswordError = null;
      state.resetPasswordComplete = false;
    },
    [resetPassword.fulfilled]: (state, action) => {
      return {
        ...state,
        ...handleAuthentication(action.payload),
        resetPasswordPending: false,
        resetPasswordError: false,
        resetPasswordComplete: true,
      };
    },
    [resetPassword.rejected]: (state, action) => {
      state.resetPasswordPending = false;
      state.resetPasswordError = action.error;
      state.resetPasswordComplete = false;
    },
    [reloadUser.pending]: (state, action) => {
      state.reloadUserPending = true;
      state.reloadUserError = null;
      state.reloadUserComplete = false;
    },
    [reloadUser.fulfilled]: (state, action) => {
      state.reloadUserPending = false;
      state.reloadUserError = null;
      state.reloadUserComplete = true;
      state.user = action.payload.user;
    },
    [reloadUser.rejected]: (state, action) => {
      state.reloadUserPending = false;
      state.reloadUserError = action.error;
      state.reloadUserComplete = false;
    },
    [visitorColdStart.pending]: (state, action) => {
      state.visitorColdStartPending = true;
      state.visitorColdStartError = null;
      state.visitorColdStartComplete = false;
    },
    [visitorColdStart.fulfilled]: (state, action) => {
      state.visitorColdStartPending = false;
      state.visitorColdStartError = null;
      state.visitorColdStartComplete = true;
      state.visitorToken = action.payload.token;
    },
    [visitorColdStart.rejected]: (state, action) => {
      state.visitorColdStartPending = false;
      state.visitorColdStartError = action.error;
      state.visitorColdStartComplete = false;
    },
  }
});

// extra actions
export const { logout, coldstart } = authenticationSlice.actions;
// reducer
export default authenticationSlice.reducer;
