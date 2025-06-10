import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { I_AuthState, I_UserProfile } from '../interfaces/authInterface';

const initialState: I_AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  grantedPermissions: []
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
      state.grantedPermissions = [];
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setGrantedPermissions: (state, action: PayloadAction<string[]>) => {
      state.grantedPermissions = action.payload;
    },
  }
});


export const { setAuth, clearAuth, setLoading, setError, setUserProfile, setGrantedPermissions} = authSlice.actions;

export default authSlice.reducer;