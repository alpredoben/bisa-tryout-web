// src/selectors/authSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './rootReducer';

export const selectAuth = (state: RootState) => state.auth;

export const selectToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);

export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectGrantedPermissions = createSelector(
  [selectAuth],
  (auth) => auth.grantedPermissions || []
);

// ADD THIS NEW MEMOIZED SELECTOR
export const selectUserListAccess = createSelector(
  [selectUser], // This selector depends on the result of selectUser
  (user) => user?.list_access || [] // This logic only runs if 'user' has changed
);
