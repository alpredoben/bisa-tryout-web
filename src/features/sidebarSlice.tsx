import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import type { I_SidebarState } from "../interfaces/appInterface";

const initialState: I_SidebarState = {
  isExpanded: true,
  isMobileOpen: true,
  isHovered: true,
  activeItem: null,
  openSubmenu: null
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isExpanded = !state.isExpanded
    },
    toggleMobileSidebar(state) {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setIsHovered(state, action: PayloadAction<boolean>) {
      state.isHovered = action.payload;
    },
    setActiveItem(state, action: PayloadAction<string | null>) {
      state.activeItem = action.payload;
    },
    toggleSubmenu(state, action: PayloadAction<string>) {
      state.openSubmenu = state.openSubmenu === action.payload ? null : action.payload;
    },
  }
});

export const {
  toggleSidebar,
  toggleMobileSidebar,
  setIsHovered,
  setActiveItem,
  toggleSubmenu,
} = sidebarSlice.actions;


const persistConfig = {
  key: "sidebar",
  storage,
};

export const persistedSidebarReducer = persistReducer(persistConfig, sidebarSlice.reducer);
export default sidebarSlice.reducer;
