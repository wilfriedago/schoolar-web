/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/shared/store'

interface UIState {
  navigation: {
    navActiveItem: string
  }
}

const initialState: UIState = {
  navigation: {
    navActiveItem: 'home'
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNavActiveItem: (state, action: PayloadAction<string>) => {
      state.navigation.navActiveItem = action.payload
    }
  }
})

export const { setNavActiveItem } = uiSlice.actions

export const selectUI = (state: RootState) => state.ui

export const uiReducer = uiSlice.reducer
