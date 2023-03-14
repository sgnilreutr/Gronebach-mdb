/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { IAppState } from './storeTypes/baseTypes'

const initialState: IAppState = Object.freeze({
  searchTerm: '',
  category: '',
  overviewQuery: '',
})

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategory: (state, { payload }: PayloadAction<IAppState['category']>) => {
      state.category = payload
    },
    setOverviewQuery: (
      state,
      { payload }: PayloadAction<IAppState['overviewQuery']>
    ) => {
      state.overviewQuery = payload
    },
    setSearchTerm: (
      state,
      { payload }: PayloadAction<IAppState['searchTerm']>
    ) => {
      state.searchTerm = payload
    },
  },
})

export const { setCategory, setOverviewQuery, setSearchTerm } = appSlice.actions

export const selectCategory = (state: RootState) => state.app.category
export const selectOverviewQuery = (state: RootState) => state.app.overviewQuery
export const selectSearchTerm = (state: RootState) => state.app.searchTerm

export default appSlice.reducer
