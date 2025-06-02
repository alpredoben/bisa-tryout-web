import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../stores/rootReducer";
import {
  toggleSidebar,
  toggleMobileSidebar,
  setIsHovered,
  setActiveItem,
  toggleSubmenu,
} from "../features/sidebarSlice";

export const useSidebar = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootState) => state.sidebar);

  return {
    ...sidebarState,
    toggleSidebar: () => dispatch(toggleSidebar()),
    toggleMobileSidebar: () => dispatch(toggleMobileSidebar()),
    setIsHovered: (isHovered: boolean) => dispatch(setIsHovered(isHovered)),
    setActiveItem: (item: string | null) => dispatch(setActiveItem(item)),
    toggleSubmenu: (item: string) => dispatch(toggleSubmenu(item)),
  };
};
