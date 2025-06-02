/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/features/auth/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  I_AuthLogin,
  I_AuthRegister,
  I_AuthForgotPassword,
  I_AuthVerifiedOtp,
  I_AuthResetPassword,
  I_AuthUpdateProfile,
  I_UserProfile,
} from '../interfaces/authInterface';
import {Environment as Cfg} from '../constants/environment'
import { RestApi } from '../constants/config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ["UserProfile"], 
  endpoints: (builder) => ({
    login: builder.mutation<any, I_AuthLogin>({
      query: (data) => ({
        url: RestApi.Endpoint.Auth.Login,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation<any, I_AuthRegister>({
      query: (data) => ({
        url: RestApi.Endpoint.Auth.Register,
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<any, I_AuthForgotPassword>({
      query: (data) => ({
        url: RestApi.Endpoint.Auth.ForgotPassword,
        method: 'POST',
        body: data,
      }),
    }),

    verifiedOtp: builder.mutation<any, I_AuthVerifiedOtp>({
      query: (data) => ({
        url: RestApi.Endpoint.Auth.VerifOtp,
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<any, I_AuthResetPassword>({
      query: (data) => ({
        url: RestApi.Endpoint.Auth.ResetPassword,
        method: 'POST',
        body: data,
      }),
    }),

    getProfile: builder.query<I_UserProfile | any, void>({
      query: () => ({
        url: RestApi.Endpoint.Auth.Profile,
        method: "GET",
      }),
      keepUnusedDataFor: 300, // Cache disimpan selama 5 menit
      providesTags: [{ type: "UserProfile" }], // Menandai data sebagai "UserProfile"
    }),

    updateProfile: builder.mutation<any, I_AuthUpdateProfile>({
      query: (data) => ({
        url: RestApi.Endpoint.Auth.UpdateProfile,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: "UserProfile" }], // Setelah update, cache "UserProfile" dihapus agar fetch ulang
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifiedOtpMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
