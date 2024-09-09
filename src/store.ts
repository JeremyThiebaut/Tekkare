import { configureStore } from '@reduxjs/toolkit'
import dataSetReducer from './slices/dataSetSlice'
import dataReducer from './slices/dataSlice'

export const store = configureStore({
  reducer: {
    dataSet: dataSetReducer,
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch