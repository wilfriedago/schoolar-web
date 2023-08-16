import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ApiConstants } from '@/shared/constants'
import type { ApiResponse } from '@/shared/types'

import type { CreateSubjectDTO, Subject, UpdateSubjectDTO } from './subjects.types'

export type RequestParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDesc?: boolean
}

export const subjectsApi = createApi({
  tagTypes: ['subjects'],
  reducerPath: 'subjects',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,

  baseQuery: fetchBaseQuery({
    baseUrl: `${ApiConstants.baseUrl}`,
    prepareHeaders(headers, _state) {
      return headers
    }
  }),

  endpoints: (build) => ({
    getSubjects: build.query<ApiResponse<Subject>, RequestParams | void>({
      query: (params) =>
        `/subjects?page=${params?.page ?? 0}&size=${params?.size ?? 10}&sortBy=${
          params?.sortBy ?? 'createdAt'
        }&sortDesc=${params?.sortDesc ?? true}`,
      providesTags: [{ type: 'subjects', id: 'list' }]
    }),

    getSubject: build.query<Subject, void>({
      query: (id) => `/subjects/${id}`,
      providesTags: (subject) => [{ type: 'subjects', id: subject?.id }]
    }),

    createSubject: build.mutation<Subject, CreateSubjectDTO>({
      query: (payload) => ({
        url: `/subjects`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'subjects', id: 'list' }]
    }),

    updateSubject: build.mutation<Subject, UpdateSubjectDTO>({
      query: (payload) => ({
        url: `/subjects/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{ type: 'subjects', id: 'list' }]
    }),

    deleteSubject: build.mutation<Subject, string>({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'subjects', id: 'list' }]
    })
  })
})

export const {
  useGetSubjectsQuery,
  useGetSubjectQuery,
  useDeleteSubjectMutation,
  useCreateSubjectMutation,
  useUpdateSubjectMutation
} = subjectsApi
