/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type {
  I_UserFormatted,
  I_UserInput,
  I_UserResponsePaginationFormatted,
} from "../interfaces/userInterface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<
      I_UserResponsePaginationFormatted | any,
      {
        page?: number;
        limit?: number;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, search }) => ({
        url: RestApi.Endpoint.Users.FetchParams,
        params: { page, limit, direction_name, order_name, search },
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findUserById: builder.query<I_UserFormatted, string>({
      query: (userId) => RestApi.Endpoint.Users.FindById(userId),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, userId) =>
        userId ? [{ type: "User", id: userId }] : [],
    }),

    createUser: builder.mutation<I_UserFormatted|any, I_UserInput>({
      query: (data) => ({
        url: RestApi.Endpoint.Users.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User" }],
    }),

    updateUser: builder.mutation<any, { user_id: string; data: I_UserInput }>({
      query: ({ user_id, data }) => ({
        url: RestApi.Endpoint.Users.Update(user_id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { user_id }) =>
        user_id ? [{ type: "User", id: user_id }] : [],
    }),

    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: RestApi.Endpoint.Users.Delete(userId),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFindUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
