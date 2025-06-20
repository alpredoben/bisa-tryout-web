/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_TryoutCategoryInput } from "../interfaces/tryoutInterface";

const TAG_NAME = 'TryoutCategory'

export const tryoutCategoryApi = createApi({
  reducerPath: "tryoutCategoryApi",
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
    fetchData: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        organization_id?: any;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, organization_id, search }) => {
        return {
          url: RestApi.Endpoint.TryoutCategory.Fetch,
          params: { page, limit, direction_name, order_name, organization_id, search },
        }
      },
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findDataById: builder.query<any, string>({
      query: (id: string) => RestApi.Endpoint.TryoutCategory.FindById(id),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, roleId) =>
        roleId ? [{ type: TAG_NAME, id: roleId }] : [],
    }),

    createData: builder.mutation<any, I_TryoutCategoryInput>({
      query: (data) => ({
        url: RestApi.Endpoint.TryoutCategory.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TAG_NAME }],
    }),

    updateData: builder.mutation<any, { id: any; data: I_TryoutCategoryInput }>({
      query: ({ id, data }) => ({
        url: RestApi.Endpoint.TryoutCategory.Update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) =>
        id ? [{ type: TAG_NAME, id: id }] : [],
    }),

    deleteData: builder.mutation<{ message: string }, string>({
      query: (id: any) => ({
        url: RestApi.Endpoint.TryoutCategory.Delete(id),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: TAG_NAME, id }],
    }),
  }),
});

export const {
  useFetchDataQuery,
  useFindDataByIdQuery,
  useCreateDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation
} = tryoutCategoryApi;
