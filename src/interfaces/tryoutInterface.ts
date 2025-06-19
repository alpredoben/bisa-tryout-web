/* eslint-disable @typescript-eslint/no-explicit-any */
/** Organization Input */
export interface I_OrganizationInput {
  name: string;
  description: string;
}

/** Tryout Stage Input */
export interface I_TryoutStageInput {
  name: string;
  description: string;
}

/** Tryout Category Input */
export interface I_TryoutCategoryInput {
  name: string
  description: string
  organization_id: any
  year: any
  prices: number
}


/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_OrganizationDropdownProps {
  value: { organization_id: string; name: string } | null;
  onChange: (selected: { organization_id: string; name: string } | null) => void;
  label?: string;
  className?: string;
}




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
