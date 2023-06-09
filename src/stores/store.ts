import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import currencyReducer from './currencySlice'
import { createLogger } from 'redux-logger'

const store = configureStore({
  reducer: {
    user: userReducer,
    currency: currencyReducer
  },
  middleware: (getDefault) => getDefault().concat(createLogger())
})

export type AppDispatch = typeof store.dispatch
const state = store.getState()
export type AppStoreState = typeof state
export default store