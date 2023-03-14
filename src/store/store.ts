import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { Action, PreloadedState, ThunkAction } from '@reduxjs/toolkit'

import appReducer from './appSlice'

const rootReducer = combineReducers({
  app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void | Promise<any | void>> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
>
export const store = setupStore()
