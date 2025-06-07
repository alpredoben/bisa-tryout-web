/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_MenuInput } from "../interfaces/menuInterface";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Cfg.BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
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
      providesTags: ["Menu"],
    }),

    findMenuById: builder.query<any, string>({
      query: (menuId: string) => RestApi.Endpoint.Menu.FindById(menuId),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, menuId) =>
        menuId ? [{ type: "Menu", id: menuId }] : [],
    }),

    createMenu: builder.mutation<any, I_MenuInput | any>({
      query: (data) => ({
        url: RestApi.Endpoint.Menu.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Menu" }],
    }),

    updateMenu: builder.mutation<any, { menu_id: string; data: any }>({
      query: ({ menu_id, data }) => ({
        url: RestApi.Endpoint.Menu.Update(menu_id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { menu_id }) =>
        menu_id ? [{ type: "Menu", id: menu_id }] : [],
    }),

    deleteMenu: builder.mutation<{ message: string }, string>({
      query: (id: any) => ({
        url: RestApi.Endpoint.Menu.Delete(id),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Menu", id },
      ],
    }),
  }),
});

export const {
  useFetchMenuQuery,
  useFindMenuByIdQuery,
  useUpdateMenuMutation,
  useCreateMenuMutation,
  useDeleteMenuMutation
} = menuApi;
