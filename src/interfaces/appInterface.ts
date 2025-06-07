/* eslint-disable @typescript-eslint/no-explicit-any */

import type { JSX } from "react";

export type ThemeName = 'light' | 'dark';

type MenuIcon = { type: string; value: JSX.Element } | null;

export type NavigationItem = {
  menu_name: string;
  menu_slug: string;
  menu_icon: MenuIcon;
  menu_order_number: number;
  childrens: NavigationItem[];
};

export interface I_ThemeState {
  theme: ThemeName
}


export interface I_SidebarState {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
}


export interface I_UpdateFilePayload {
  id: string;
  module_name: string;
  file: File | any;
}