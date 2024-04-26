import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isLocked : true,
    isSleep : false,
    isRestart : false,
    isShutDown : false,
  },
  reducers: {
    setLock : (state, action) => {
        state.isLocked = action.payload
    },
    setSleep : (state, action) => {
        state.isSleep = action.payload
    },
    setRestart : (state, action) => {
        state.isRestart= action.payload
    },
    setShutDown : (state, action) => {
        state.isShutDown= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLock, setSleep, setRestart, setShutDown} = homeSlice.actions
export default homeSlice.reducer