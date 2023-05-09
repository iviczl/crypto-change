import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userReducer"

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch

export default store