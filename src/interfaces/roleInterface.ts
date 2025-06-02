/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_RoleInput {
  role_name: string
}

export interface I_RoleFormatted {
  role_id: string;
  role_name: string;
  role_slug: string;
  created_at?: any | null;
  updated_at?: any | null;
}

export interface I_RoleResponsePaginationFormatted {
  records: I_RoleFormatted[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number; 
}

export interface I_RoleModal {
  isOpen: boolean;
  onClose: () => void;
  role_id?: number; // Jika ada, modal dalam mode edit
  onSuccess: () => void;  // callback setelah berhasil simpan/ubah
}


