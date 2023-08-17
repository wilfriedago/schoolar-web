import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ApiConstants } from '@/shared/constants'
import type { ApiResponse } from '@/shared/interfaces'

import type { Classroom, CreateClassroomDTO, UpdateClassroomDTO } from './classrooms.types'

export type RequestParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDesc?: boolean
}

export const classroomsApi = createApi({
  tagTypes: ['classrooms'],
  reducerPath: 'classrooms',
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
    getClassrooms: build.query<ApiResponse<Classroom>, RequestParams | void>({
      query: (params) =>
        `/classrooms?page=${params?.page ?? 0}&size=${params?.size ?? 10}&sortBy=${
          params?.sortBy ?? 'createdAt'
        }&sortDesc=${params?.sortDesc ?? true}`,
      providesTags: [{ type: 'classrooms', id: 'list' }]
    }),

    getClassroom: build.query<Classroom, void>({
      query: (id) => `/classrooms/${id}`,
      providesTags: (classroom) => [{ type: 'classrooms', id: classroom?.id }]
    }),

    createClassroom: build.mutation<Classroom, CreateClassroomDTO>({
      query: (payload) => ({
        url: `/classrooms`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'classrooms', id: 'list' }]
    }),

    updateClassroom: build.mutation<Classroom, UpdateClassroomDTO>({
      query: (payload) => ({
        url: `/classrooms/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{ type: 'classrooms', id: 'list' }]
    }),

    deleteClassroom: build.mutation<Classroom, string>({
      query: (id) => ({
        url: `/classrooms/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'classrooms', id: 'list' }]
    })
  })
})

export const {
  useGetClassroomsQuery,
  useGetClassroomQuery,
  useDeleteClassroomMutation,
  useCreateClassroomMutation,
  useUpdateClassroomMutation
} = classroomsApi
