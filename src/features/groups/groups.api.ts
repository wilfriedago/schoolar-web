import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ApiConstants } from '@/shared/constants'
import type { ApiResponse } from '@/shared/interfaces'

import type { CreateGroupDTO, Group, UpdateGroupDTO } from './groups.types'

export type RequestParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDesc?: boolean
}

export const groupsApi = createApi({
  tagTypes: ['groups'],
  reducerPath: 'groups',
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
    getGroups: build.query<ApiResponse<Group>, RequestParams | void>({
      query: (params) =>
        `/groups?page=${params?.page ?? 0}&size=${params?.size ?? 10}&sortBy=${
          params?.sortBy ?? 'createdAt'
        }&sortDesc=${params?.sortDesc ?? true}`,
      providesTags: [{ type: 'groups', id: 'list' }]
    }),

    getGroup: build.query<Group, void>({
      query: (id) => `/groups/${id}`,
      providesTags: (group) => [{ type: 'groups', id: group?.id }]
    }),

    createGroup: build.mutation<Group, CreateGroupDTO>({
      query: (payload) => ({
        url: `/groups`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'groups', id: 'list' }]
    }),

    updateGroup: build.mutation<Group, UpdateGroupDTO>({
      query: (payload) => ({
        url: `/groups/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{ type: 'groups', id: 'list' }]
    }),

    deleteGroup: build.mutation<Group, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'groups', id: 'list' }]
    })
  })
})

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useDeleteGroupMutation,
  useCreateGroupMutation,
  useUpdateGroupMutation
} = groupsApi
