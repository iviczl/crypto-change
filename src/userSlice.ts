import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsers, logIn, logOut, addCurrency, removeCurrency } from "./services/user"
import { IUser } from "./types/user"
import { Currency } from "./types/currency"
import { AppStoreState } from "./store"

enum FeatureState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  REJECTED = 'rejected'
}

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
export const addUserCurrency = createAsyncThunk<IUser, Currency>('user/addCurrency', async (c, api) => {
  const state = api.getState() as AppStoreState
  let user = state.user.user
  if(user) {
    user = await addCurrency(user, c)
  }
  return user
})
export const removeUserCurrency = createAsyncThunk<IUser, string>('user/removeCurrency', async (code, api) => {
  const state = api.getState() as AppStoreState
  let user = state.user.user
  if(user) {
    user = await removeCurrency(user, code)
  }
  return user
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      logOut()
      state.user = null
      state.status = FeatureState.IDLE
    },
    // addCurrency: {
    //   reducer: (state, action: PayloadAction<Currency>) => { 
    //     if(!state.user?.activeCurrencies.some(c => c.code === action.payload.code)) {
    //       state.user?.activeCurrencies.push(action.payload)
    //       updateUser({...(state.user || {} as IUser)})
    //     }
    //   },
    //   prepare: (currency: Currency) => ({ payload: currency})
    // },
    // removeCurrency: {
    //   reducer:  (state, action: PayloadAction<Currency>) => { 
    //     const index = state.user?.activeCurrencies.findIndex(c => c.code === action.payload.code)
    //     if(index) {
    //       state.user?.activeCurrencies.splice(index,1)
    //       updateUser({...(state.user || {} as IUser)})
    //     }
    //   },
    //   prepare: (currency: Currency) => ({ payload: currency})
    // }
  },
  extraReducers(builder) {
    builder
    .addCase(login.pending, (state, action) => {
      state.status = FeatureState.LOADING
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = FeatureState.SUCCEEDED,
      state.user = action.payload
    })
    .addCase(login.rejected, (state) => {
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
    .addCase(addUserCurrency.pending, (state) => {
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

export const { logout } = userSlice.actions
export default userSlice.reducer