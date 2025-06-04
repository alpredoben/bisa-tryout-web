/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_PermissionInput {
  name: string;
  order_number: string;
}

export interface I_PermissionFormatted {
  permission_id: string;
  name: string;
  order_number: string;
  created_at?: any | null;
  updated_at?: any | null;
}

export interface I_PermissionResponsePaginationFormatted {
  records: I_PermissionFormatted[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number; 
}

export interface I_PermissionModal {
  isOpen: boolean;
  onClose: () => void;
  permission_id?: number; // Jika ada, modal dalam mode edit
  onSuccess: () => void;  // callback setelah berhasil simpan/ubah
}


