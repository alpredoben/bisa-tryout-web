/* eslint-disable @typescript-eslint/no-explicit-any */
export interface I_AuthState {
  user: I_UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  grantedPermissions?: string[] 
}

export interface I_RoleAccess {
  role_id: string;
  role_name: string;
  role_slug: string;
}

export interface I_UserProfile {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  photo?: any;
  role: I_RoleAccess,
  created_at: Date,
  updated_at: Date,
  list_access?: any | null;
}

export interface I_AuthLogin {
  email: string;
  password: string;
  remember_me?: boolean
}

export interface I_AuthRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  accepted?: boolean;
}

export interface I_AuthForgotPassword {
  email: string;
}

export interface I_AuthVerifiedOtp {
  email: string;
  otp_code: string;
}

export interface I_AuthResetPassword {
  code_permission: string;
  new_password: string;
  confirm_password: string;
}

export interface I_AuthUpdateProfile {
  file_id?: string;
  name: string;
  email: string;
  phone: string;
}