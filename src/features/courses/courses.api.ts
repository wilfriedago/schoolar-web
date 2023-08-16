import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ApiConstants } from '@/shared/constants'
import type { ApiResponse } from '@/shared/types'

import type { Course, CreateCourseDTO, UpdateCourseDTO } from './courses.types'

export type RequestParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDesc?: boolean
}

export const coursesApi = createApi({
  tagTypes: ['courses'],
  reducerPath: 'courses',
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
    getCourses: build.query<ApiResponse<Course>, RequestParams | void>({
      query: (params) =>
        `/courses?page=${params?.page ?? 0}&size=${params?.size ?? 10}&sortBy=${
          params?.sortBy ?? 'createdAt'
        }&sortDesc=${params?.sortDesc ?? true}`,
      providesTags: [{ type: 'courses', id: 'list' }]
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (course) => [{ type: 'courses', id: course?.id }]
    }),

    createCourse: build.mutation<Course, CreateCourseDTO>({
      query: (payload) => ({
        url: `/courses`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'courses', id: 'list' }]
    }),

    updateCourse: build.mutation<Course, UpdateCourseDTO>({
      query: (payload) => ({
        url: `/courses/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{ type: 'courses', id: 'list' }]
    }),

    deleteCourse: build.mutation<Course, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'courses', id: 'list' }]
    })
  })
})

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useDeleteCourseMutation,
  useCreateCourseMutation,
  useUpdateCourseMutation
} = coursesApi
