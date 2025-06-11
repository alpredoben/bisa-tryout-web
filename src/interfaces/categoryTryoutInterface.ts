/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_CategoryTryoutInput {
  name: string
  description: string
}

export interface I_CategoryTryoutFormatted {
  category_id: string;
  name: string;
  description: string;
  created_at?: any | null;
  updated_at?: any | null;
}

export interface I_CategoryTryoutResponsePaginationFormatted {
  records: I_CategoryTryoutFormatted[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number; 
}

export interface I_CategoryTryoutModal {
  isOpen: boolean;
  onClose: () => void;
  role_id?: number; // Jika ada, modal dalam mode edit
  onSuccess: () => void;  // callback setelah berhasil simpan/ubah
}


