import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { AuthApi } from '@/features/auth'
import { classroomsApi } from '@/features/classrooms'
import { coursesApi } from '@/features/courses'
import { groupsApi } from '@/features/groups'
import { subjectsApi } from '@/features/subjects'

const reducers = {
  [AuthApi.reducerPath]: AuthApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [classroomsApi.reducerPath]: classroomsApi.reducer,
  [subjectsApi.reducerPath]: subjectsApi.reducer,
  [coursesApi.reducerPath]: coursesApi.reducer
  // Add your other reducers here
}

const middlewares = [
  AuthApi.middleware,
  groupsApi.middleware,
  classroomsApi.middleware,
  subjectsApi.middleware,
  coursesApi.middleware
  // Add your middlewares here
]

export const AppStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(AppStore.dispatch)

export type RootState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch
