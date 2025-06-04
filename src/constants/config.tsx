export const RestApi = {
  Endpoint:{
    Auth: {
      Login: '/auth/login',
      Register: '/auth/register',
      ForgotPassword: '/auth/forgot-password',
      VerifOtp: '/auth/verified-otp',
      ResetPassword: '/auth/reset-password',
      Profile: '/auth/profile',
      UpdateProfile: '/auth/update-profile'
    },
    Roles: {
      FetchParams: '/roles',
      FindById: (id:string) => `/roles/${id}`,
      Create: '/roles',
      Update: (id: string) => `/roles/${id}`,
      Delete: (id: string) => `/roles/${id}`
    },
    Permissions: {
      FetchParams: '/permissions',
      FindById: (id:string) => `/permissions/${id}`,
      Create: '/permissions',
      Update: (id: string) => `/permissions/${id}`,
      Delete: (id: string) => `/permissions/${id}`
    },
    Menu: {
      Fetch: '/menu'
    }
  } 
}