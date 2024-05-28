import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    safariUrl: "homePage",
    currApp: "Safari",
    history: ["homePage"],
    historyIndex: 0,
  },
  reducers: {
    setSafariUrl: (state, action: PayloadAction<string>) => {
      const newUrl = action.payload
      state.safariUrl = newUrl

      // Adjust history on URL change
      if (state.historyIndex < state.history.length - 1) {
        state.history = state.history.slice(0, state.historyIndex + 1)
      }
      state.history.push(newUrl)
      state.historyIndex++
    },
    goBack: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--
        state.safariUrl = state.history[state.historyIndex]
      }
    },
    goForward: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++
        state.safariUrl = state.history[state.historyIndex]
      }
    },
    setCurrApp: (state, action: PayloadAction<string>) => {
      state.currApp = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSafariUrl, goBack, goForward, setCurrApp } = appSlice.actions
export default appSlice.reducer
