/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_TryoutPackageInput } from "../interfaces/tryoutInterface";

const TAG_NAME = 'PackageTryout'

export const packageTryoutApi = createApi({
  reducerPath: "packageTryoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: [TAG_NAME],
  endpoints: (builder) => ({
    fetchPackages: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        category_id?: any;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, category_id, search }) => {
        return {
          url: RestApi.Endpoint.PackageTryout.Fetch,
          params: { page, limit, direction_name, order_name, category_id, search },
        }
      },
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findPackageById: builder.query<any, string>({
      query: (id: string) => RestApi.Endpoint.PackageTryout.FindById(id),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, roleId) =>
        roleId ? [{ type: TAG_NAME, id: roleId }] : [],
    }),

    createPackage: builder.mutation<any, I_TryoutPackageInput>({
      query: (data) => ({
        url: RestApi.Endpoint.PackageTryout.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TAG_NAME }],
    }),

    updatePackage: builder.mutation<any, { id: any; data: I_TryoutPackageInput }>({
      query: ({ id, data }) => ({
        url: RestApi.Endpoint.PackageTryout.Update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) =>
        id ? [{ type: TAG_NAME, id: id }] : [],
    }),

    deletePackage: builder.mutation<{ message: string }, string>({
      query: (roleId) => ({
        url: RestApi.Endpoint.Roles.Delete(roleId),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: TAG_NAME, id }],
    }),
  }),
});

export const {
  useFetchPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useFindPackageByIdQuery,
  useDeletePackageMutation
} = packageTryoutApi;
