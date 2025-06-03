/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as any).auth.token;
      if(token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json")
      return headers;
    },
  }),
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    fetchMenu: builder.query<any, void>({
      query: () => ({
        url: RestApi.Endpoint.Menu.Fetch,
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
      providesTags: ["Menu"]
    })
  })
})

export const {useFetchMenuQuery} = menuApi