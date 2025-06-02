/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type {
  I_RoleFormatted,
  I_RoleInput,
  I_RoleResponsePaginationFormatted,
} from "../interfaces/roleInterface";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    fetchRoles: builder.query<
      I_RoleResponsePaginationFormatted | any,
      {
        page?: number;
        limit?: number;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, search }) => ({
        url: RestApi.Endpoint.Roles.FetchParams,
        params: { page, limit, direction_name, order_name, search },
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findRoleById: builder.query<I_RoleFormatted, string>({
      query: (roleId) => RestApi.Endpoint.Roles.FindById(roleId),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, roleId) =>
        roleId ? [{ type: "Role", id: roleId }] : [],
    }),

    createRole: builder.mutation<I_RoleFormatted|any, I_RoleInput>({
      query: (data) => ({
        url: RestApi.Endpoint.Roles.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Role" }],
    }),

    updateRole: builder.mutation<any, { role_id: string; data: I_RoleInput }>({
      query: ({ role_id, data }) => ({
        url: RestApi.Endpoint.Roles.Update(role_id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { role_id }) =>
        role_id ? [{ type: "Role", id: role_id }] : [],
    }),

    deleteRole: builder.mutation<{ message: string }, string>({
      query: (roleId) => ({
        url: RestApi.Endpoint.Roles.Delete(roleId),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, roleId) => [{ type: "Role", id: roleId }],
    }),
  }),
});

export const {
  useFetchRolesQuery,
  useFindRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation
} = roleApi;
