import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../stores/rootReducer";
import {
  toggleSidebar,
  toggleMobileSidebar,
  setIsHovered,
  setActiveItem,
  toggleSubmenu,
  setIsMobile,
} from "../features/sidebarSlice";
import { useEffect } from "react";

export const useSidebar = () => {
  const dispatch = useDispatch();
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    isMobile
  } = useSelector((state: RootState) => state.sidebar)


  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      dispatch(setIsMobile(isMobileView));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch])


  return {
    isExpanded: isMobile ? false : isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    toggleSidebar: () => dispatch(toggleSidebar()),
    toggleMobileSidebar: () => dispatch(toggleMobileSidebar()),
    setIsHovered: (hovered: boolean) => dispatch(setIsHovered(hovered)),
    setActiveItem: (item: string | null) => dispatch(setActiveItem(item)),
    toggleSubmenu: (item: string) => dispatch(toggleSubmenu(item)),
  };
};
