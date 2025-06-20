/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_TryoutDetailInput } from "../interfaces/tryoutInterface";

const TAG_NAME = 'TryoutDetail'

export const tryoutDetailApi = createApi({
  reducerPath: "tryoutDetailApi",
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
        direction_name?: string;
        package_id?: any
        type_id?: any
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, package_id, type_id, search }) => {
        return {
          url: RestApi.Endpoint.TryoutDetail.Fetch,
          params: { page, limit, direction_name, order_name, package_id, type_id, search },
        }
      },
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findDataById: builder.query<any, string>({
      query: (id: string) => RestApi.Endpoint.TryoutDetail.FindById(id),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) =>
        id ? [{ type: TAG_NAME, id }] : [],
    }),

    createData: builder.mutation<any, I_TryoutDetailInput>({
      query: (data) => ({
        url: RestApi.Endpoint.TryoutDetail.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TAG_NAME }],
    }),

    updateData: builder.mutation<any, { id: any; data: I_TryoutDetailInput }>({
      query: ({ id, data }) => ({
        url: RestApi.Endpoint.TryoutDetail.Update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) =>
        id ? [{ type: TAG_NAME, id: id }] : [],
    }),

    deleteData: builder.mutation<{ message: string }, string>({
      query: (id: any) => ({
        url: RestApi.Endpoint.TryoutDetail.Delete(id),
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
} = tryoutDetailApi;
