import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isLocked : true,
    isSleep : false,
  },
  reducers: {
    setLock : (state, action) => {
        state.isLocked = action.payload
    },
    setSleep : (state, action) => {
        state.isSleep= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLock, setSleep} = homeSlice.actions
export default homeSlice.reducer