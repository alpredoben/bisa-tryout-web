import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import type { ThemeName, I_ThemeState } from '../interfaces/appInterface';


const initialState: I_ThemeState = {
  theme: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeName>) {
      state.theme = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    }
  }
})

export const {setTheme, toggleTheme} = themeSlice.actions;


export const persistedThemeReducer = persistReducer({
  key: 'theme',
  storage,
}, themeSlice.reducer)

export default themeSlice.reducer