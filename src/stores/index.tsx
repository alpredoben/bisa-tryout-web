// File: ./src/stores/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './rootReducer';
import { persistStore } from 'redux-persist';
import { useDispatch } from 'react-redux';
import { authApi } from '../services/authApi';
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
import { tryoutTypeApi } from '../services/tryoutTypeApi';
import { tryoutPackageApi } from '../services/tryoutPackageApi';
import { tryoutDetailApi } from '../services/tryoutDetailApi';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      roleApi.middleware,
      menuApi.middleware,
      permissionApi.middleware,
      filesApi.middleware,
      userApi.middleware,
      packageTryoutApi.middleware,
      historyTryoutApi.middleware,
      questionTypeApi.middleware,
      organizationApi.middleware,
      tryoutCategoryApi.middleware,
      tryoutStageApi.middleware,
      tryoutTypeApi.middleware,
      tryoutPackageApi.middleware,
      tryoutDetailApi.middleware
    ),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
