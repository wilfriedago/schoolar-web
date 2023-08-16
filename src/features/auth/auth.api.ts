import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { User } from '@/features/users'

export const AuthApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/auth'
  }),
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => 'me'
    })
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true
})

export const { useGetMeQuery } = AuthApi
