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
    Menu: {
      Fetch: '/menu'
    }
  } 
}