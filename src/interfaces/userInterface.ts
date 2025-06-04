/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_UserInput {
  name: string;
  email: string;
  file: string;
  phone: string;
  password: string;
  role_id: string
}

export interface I_UserFormatted {
  user_id: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  created_at?: any | null;
  updated_at?: any | null;
}

export interface I_UserResponsePaginationFormatted {
  records: I_UserFormatted[] | [];
  next_page: number;
  prev_page: number;
  total_page: number;
  total_row: number;
  limit: number;
  page: number; 
}

export interface I_UserModal {
  isOpen: boolean;
  onClose: () => void;
  User_id?: number; // Jika ada, modal dalam mode edit
  onSuccess: () => void;  // callback setelah berhasil simpan/ubah
}


