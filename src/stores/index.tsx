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
import { categoryTryoutApi } from '../services/categoryTryoutApi';
import { packageTryoutApi } from '../services/packageTryoutApi';

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
      categoryTryoutApi.middleware,
      packageTryoutApi.middleware
    ),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
