/* eslint-disable @typescript-eslint/no-explicit-any */

import type { JSX } from "react";

export type ThemeName = 'light' | 'dark';

type MenuIcon = { type: string; value: JSX.Element } | null;

export type NavigationItem = {
  menu_name: string;
  menu_slug: string;
  menu_icon: MenuIcon;
  menu_order_number: number;
  is_sidebar: boolean;
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
  isMobile: boolean
}


export interface I_UpdateFilePayload {
  id: string;
  module_name: string;
  file: File | any;
}

export interface I_ResponsePagination {
  records: any[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number; 
}


export interface I_ApiResponse {
  records: any[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number;

}

export interface I_TableProperties {
  datatable: I_ApiResponse;
  search?: string;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (value: number) => void;
  directionName: string;
  orderName: "asc" | "desc";
  onEdit?: (data: any) => void;
  onRemove?: (data: any) => void;
  onView?:(data: any) => void;
  onSuccess?: (message: string) => void; 
  onError?: (message: string) => void;
  onSortRow?: (data: any) => void;
  refetchTable?: () => void;
  listPermissions?: any[]
}

export interface I_TableHeaders {
  id: number;
  title: string;
  name?:string;
  className?: string;
}

export interface I_ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
  selectedId?: string | null;
  refetchData?: () =>void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  typeName?: any | null
}