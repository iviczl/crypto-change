import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { logIn, logOut } from "./services/user"
import { IUser } from "./types/user"


const initialState : {
  user: IUser | null,
  status: string,
  error: string
} = {
  user: null,
  status: 'idle',
  error: ''
}

export const login = createAsyncThunk<IUser, { userName: string, password: string }>('user/login', u => logIn(u.userName, u.password) )

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      logOut()
      state.user = null
    }
  },
  extraReducers(builder) {
    builder
    .addCase(login.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded',
      state.user = action.payload
    })
    .addCase(login.rejected, (state) => {
      state.status = 'rejected'
    })
  }
})

export default userSlice.reducer