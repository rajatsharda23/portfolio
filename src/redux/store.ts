import { configureStore } from "@reduxjs/toolkit"
import homeSlice from './slices/homePage/homeSlice'
import appSlice from "./slices/homePage/appSlice"

export const store = configureStore({
  reducer: {
    home: homeSlice,
    app : appSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch