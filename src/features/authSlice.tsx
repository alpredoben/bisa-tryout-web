import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { I_AuthState, I_UserProfile } from '../interfaces/authInterface';
import {Environment as Cfg} from '../constants/environment'

const initialState: I_AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string }>
    ) => {
      state.token = action.payload.token;
      localStorage.setItem(`${Cfg.PrefixStorage}token`, action.payload.token);
    },

    setUserProfile: (
      state,
      action: PayloadAction<{ user: I_UserProfile; }>
    ) => {
      state.user = action.payload.user;
    },

    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  }
});


export const { setAuth, clearAuth, setLoading, setError, setUserProfile} = authSlice.actions;

export default authSlice.reducer;