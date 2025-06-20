/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_TryoutStageInput } from "../interfaces/tryoutInterface";

const TAG_NAME = 'TryoutStage'

export const tryoutStageApi = createApi({
  reducerPath: "tryoutStageApi",
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
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, search }) => {
        return {
          url: RestApi.Endpoint.TryoutStage.Fetch,
          params: { page, limit, direction_name, order_name, search },
        }
      },
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

    findDataById: builder.query<any, string>({
      query: (id: string) => RestApi.Endpoint.TryoutStage.FindById(id),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) =>
        id ? [{ type: TAG_NAME, id }] : [],
    }),

    createData: builder.mutation<any, I_TryoutStageInput>({
      query: (data) => ({
        url: RestApi.Endpoint.TryoutStage.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TAG_NAME }],
    }),

    updateData: builder.mutation<any, { id: any; data: I_TryoutStageInput }>({
      query: ({ id, data }) => ({
        url: RestApi.Endpoint.TryoutStage.Update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) =>
        id ? [{ type: TAG_NAME, id: id }] : [],
    }),

    deleteData: builder.mutation<{ message: string }, string>({
      query: (id: any) => ({
        url: RestApi.Endpoint.TryoutStage.Delete(id),
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
} = tryoutStageApi;
