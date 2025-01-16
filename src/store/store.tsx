import { configureStore } from '@reduxjs/toolkit'
import { SliceStorage } from './slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        storage: SliceStorage.reducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']