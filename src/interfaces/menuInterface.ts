/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_MenuInput {
  name: string;
  slug: string;
  order_number: number;
  parent_id?: any | null;
  file_id?: any | null;
}



export interface I_MenuModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode?: boolean;
  selectMenuId?: any;
  selectedParentId?: any;
  refetchData?: () => void;
  onSuccess?: (message: string) => void;
}
