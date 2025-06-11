/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_ResponsePagination } from "../interfaces/appInterface";
import type { I_CategoryTryoutFormatted, I_CategoryTryoutInput } from "../interfaces/categoryTryoutInterface";

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

    findCategoryById: builder.query<I_CategoryTryoutFormatted, string>({
      query: (categoryId) => RestApi.Endpoint.CategoryTryout.FindById(categoryId),
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, categoryId) =>
        categoryId ? [{ type: "CategoryTryout", id: categoryId }] : [],
    }),
    
    createCategory: builder.mutation<I_CategoryTryoutFormatted|any, I_CategoryTryoutInput>({
      query: (data) => ({
        url: RestApi.Endpoint.CategoryTryout.Create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CategoryTryout" }],
    }),

    updateCategory: builder.mutation<any, { category_id: string; data: I_CategoryTryoutInput }>({
      query: ({ category_id, data }) => ({
        url: RestApi.Endpoint.CategoryTryout.Update(category_id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { category_id }) =>
        category_id ? [{ type: "CategoryTryout", id: category_id }] : [],
    }),
    
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (category_id) => ({
        url: RestApi.Endpoint.CategoryTryout.Delete(category_id),
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, category_id) => [{ type: "CategoryTryout", id: category_id }],
    }),
  }),
});

export const {
  useFetchCategoryQuery,
  useFindCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryTryoutApi;
