/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_CategoryTryoutDropdownProps {
  value: { category_id: string; name: string } | null;
  onChange: (selected: { category_id: string; name: string } | null) => void;
  label?: string;
  className?: string;
}

export interface I_TryoutPackageInput {
  name: string;
  description: string;
  category_id?: any;
  prices: number;
}
