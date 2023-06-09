import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsers, logIn, logOut, addCurrency, removeCurrency, updateUser } from "../services/user"
import { IUser } from "../types/user"
import { Currency } from "../types/currency"
import { AppStoreState } from "./store"
import { FeatureState } from "./FeatureState"


const initialState : {
  users: IUser[] | [],
  user: IUser | null,
  status: FeatureState,
  error: string
} = {
  users: [],
  user: null,
  status: FeatureState.IDLE,
  error: ''
}

export const userList = createAsyncThunk<IUser[]>('users/list', () => getUsers() )
export const login = createAsyncThunk<IUser, { userName: string, password: string }>('user/login', u => logIn(u.userName, u.password) )
export const logout = createAsyncThunk('user/logout', () => logOut())
export const addUserCurrency = createAsyncThunk('user/addCurrency', async (c: Currency, { getState}) => {
  const state = getState() as AppStoreState
  const user = state.user.user
  if(!!user && !user.activeCurrencies.some(a => a.code === c.code)) {
    const newUser = JSON.parse(JSON.stringify(user)) as IUser
    newUser.activeCurrencies.push(c)
    await updateUser(newUser)
    return newUser
  }
  return user
})
export const removeUserCurrency = createAsyncThunk('user/removeCurrency', async (code: string, {getState}) => {
  const state = getState() as AppStoreState
  const user = state.user.user
  if(user) {
    const newUser = JSON.parse(JSON.stringify(user)) as IUser
    const index = newUser.activeCurrencies.findIndex(a => a.code === code)
    if(index > -1) {
      newUser.activeCurrencies.splice(index,1)
      await updateUser(newUser)
      return newUser
    }
  }
  return user
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
    .addCase(login.pending, (state) => {
      console.log('login pending')
      state.status = FeatureState.LOADING
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = FeatureState.SUCCEEDED,
      state.user = action.payload
    })
    .addCase(login.rejected, (state) => {
      state.status = FeatureState.REJECTED
    })
    .addCase(logout.pending, (state) => {
      console.log('logout pending')
      state.status = FeatureState.LOADING
    })
    .addCase(logout.fulfilled, (state) => {
      state.status = FeatureState.SUCCEEDED
      console.log('logout fullfilled')
      state.user = null
    })
    .addCase(logout.rejected, (state) => {
      console.log('logout rejected')
      state.status = FeatureState.REJECTED
    })
    .addCase(userList.pending, (state, action) => {
      state.status = FeatureState.LOADING
    })
    .addCase(userList.fulfilled, (state, action) => {
      state.status = FeatureState.SUCCEEDED,
      state.users = action.payload
    })
    .addCase(userList.rejected, (state) => {
      state.status = FeatureState.REJECTED
    })
    .addCase(addUserCurrency.pending, (state, action) => {
      state.status = FeatureState.LOADING
    })
    .addCase(addUserCurrency.fulfilled, (state, action) => {
      state.status = FeatureState.SUCCEEDED
      state.user = action.payload
    })
    .addCase(addUserCurrency.rejected, (state) => {
      state.status = FeatureState.REJECTED
    })
    .addCase(removeUserCurrency.pending, (state) => {
      state.status = FeatureState.LOADING
    })
    .addCase(removeUserCurrency.fulfilled, (state, action) => {
      state.status = FeatureState.SUCCEEDED
      state.user = action.payload
    })
    .addCase(removeUserCurrency.rejected, (state) => {
      state.status = FeatureState.REJECTED
    })
  }
})

// export const { } = userSlice.actions
export default userSlice.reducer