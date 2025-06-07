/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Environment as Cfg } from "../constants/environment";
import { RestApi } from "../constants/config";
import type { I_UpdateFilePayload } from '../interfaces/appInterface';

export const filesApi = createApi({
  reducerPath: 'filesApi',
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
  endpoints: (builder) => ({
    saveFile: builder.mutation<any, any>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: RestApi.Endpoint.Files.SaveFile,
          method: 'POST',
          body: formData
        }
      }
    }),

    updateFile: builder.mutation<any, I_UpdateFilePayload>({
      query: ({ module_name, file, id }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: RestApi.Endpoint.Files.UpdateFile(module_name, id),
          method: 'PUT',
          body: formData,
        };
      },
    }),
  })
})

export const { useSaveFileMutation, useUpdateFileMutation } = filesApi;