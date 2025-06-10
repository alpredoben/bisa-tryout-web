/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_ResponsePagination } from "../interfaces/appInterface";

export const categoryTryoutApi = createApi({
  reducerPath: "categoryTryoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["CategoryTryout"],
  endpoints: (builder) => ({
    fetchCategory: builder.query<
    I_ResponsePagination | any,
      {
        page?: number;
        limit?: number;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, search }) => ({
        url: RestApi.Endpoint.CategoryTryout.Fetch,
        params: { page, limit, direction_name, order_name, search },
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useFetchCategoryQuery
} = categoryTryoutApi;
