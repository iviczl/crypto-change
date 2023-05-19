import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import { createLogger } from 'redux-logger'

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefault) => getDefault().concat(createLogger())
})

export type AppDispatch = typeof store.dispatch
const state = store.getState()
export type AppStoreState = typeof state
export default store