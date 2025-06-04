/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type {
  I_PermissionFormatted,
  I_PermissionInput,
  I_PermissionResponsePaginationFormatted,
} from "../interfaces/permissionInterface";

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Permission"],
  endpoints: (builder) => ({
    fetchPermissions: builder.query<
      I_PermissionResponsePaginationFormatted | any,
      {
        page?: number;
        limit?: number;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, search }) => ({
        url: RestApi.Endpoint.Permissions.FetchParams,
        params: { page, limit, direction_name, order_name, search },
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findPermissionById: builder.query<I_PermissionFormatted, string>({
      query: (permissionId) => RestApi.Endpoint.Permissions.FindById(permissionId),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, permissionId) =>
        permissionId ? [{ type: "Permission", id: permissionId }] : [],
    }),

    createPermission: builder.mutation<I_PermissionFormatted|any, I_PermissionInput>({
      query: (data) => ({
        url: RestApi.Endpoint.Permissions.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Permission" }],
    }),

    updatePermission: builder.mutation<any, { permission_id: string; data: I_PermissionInput }>({
      query: ({ permission_id, data }) => ({
        url: RestApi.Endpoint.Permissions.Update(permission_id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { permission_id }) =>
        permission_id ? [{ type: "Permission", id: permission_id }] : [],
    }),

    deletePermission: builder.mutation<{ message: string }, string>({
      query: (permissionId) => ({
        url: RestApi.Endpoint.Permissions.Delete(permissionId),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, permissionId) => [{ type: "Permission", id: permissionId }],
    }),
  }),
});

export const {
  useFetchPermissionsQuery,
  useFindPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation
} = permissionApi;
