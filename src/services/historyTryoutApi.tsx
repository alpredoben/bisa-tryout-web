/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";

const TAG_NAME = 'HistoryTryout'

export const historyTryoutApi = createApi({
  reducerPath: "historyTryoutApi",
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
    fetchHistoryTryout: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        history_type?: any;
        history_status?: any;
        direction_name?: string;
        order_name?: string;
        search?: string;
      }
    >({
      query: ({ page, limit, direction_name, order_name, history_status = 'all', history_type = 'all', search }) => {
        return {
          url: RestApi.Endpoint.HistoryTryout.Fetch,
          params: { page, limit, direction_name, order_name, history_status, history_type, search },
        }
      },
      transformResponse: (response: any) => {
        return response.data;
      },
    }),

  }),
});

export const {
  useFetchHistoryTryoutQuery,
} = historyTryoutApi;
