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


/** Tryout Type Input */
export interface I_TryoutTypeInput {
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

export interface I_TryoutPackageInput {
  category_id: any;
  stage_id: any;
}


export interface I_TryoutDetailInput {
  package_id: any
  type_id: any
  total_questions: number
  total_duration?: number
  satuan_duration?: string
  passing_grade: number
  order_number: number
}



/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_CategoryTryoutDropdownProps {
  value: { category_id: string; name: string } | null;
  onChange: (selected: { category_id: string; name: string } | null) => void;
  label?: string;
  className?: string;
}


/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_StageTryoutDropdownProps {
  value: { stage_id: string; name: string } | null;
  onChange: (selected: { stage_id: string; name: string } | null) => void;
  label?: string;
  className?: string;
}

