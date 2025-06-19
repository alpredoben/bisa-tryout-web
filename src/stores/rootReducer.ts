// File: ./src/stores/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authSlice';
import { authApi } from '../services/authApi';
import {persistedThemeReducer} from '../features/themeSlice'
import { persistedSidebarReducer } from '../features/sidebarSlice';
import { roleApi } from '../services/roleApi';
import { menuApi } from '../services/menuApi';
import { permissionApi } from '../services/permissionApi';
import { filesApi } from '../services/fileApi';
import { userApi } from '../services/userApi';
import { packageTryoutApi } from '../services/packageTryoutApi';
import { historyTryoutApi } from '../services/historyTryoutApi';
import { questionTypeApi } from '../services/questionTypeApi';
import { organizationApi } from '../services/organizationApi';
import { tryoutCategoryApi } from '../services/tryoutCategoryApi';
import { tryoutStageApi } from '../services/tryoutStageApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'theme', 'sidebar'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: persistedThemeReducer,
  sidebar: persistedSidebarReducer,
  [authApi.reducerPath]: authApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [permissionApi.reducerPath]: permissionApi.reducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [packageTryoutApi.reducerPath]: packageTryoutApi.reducer,
  [historyTryoutApi.reducerPath]: historyTryoutApi.reducer,
  [questionTypeApi.reducerPath]: questionTypeApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  [tryoutCategoryApi.reducerPath]: tryoutCategoryApi.reducer,
  [tryoutStageApi.reducerPath]: tryoutStageApi.reducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
