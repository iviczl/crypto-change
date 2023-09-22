import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCurrencies } from "../services/currency"
import { Currency } from "../types/currency"
import { AppDispatch, AppStoreState } from "./store"
import { FeatureState } from "./FeatureState"
import { Rate } from "../types/rate"
import { rateServerConnectToggle } from "../services/rateServerHandler"

type CurrencyState = {
  currencies: Currency[]
  rates: Rate[]
  rateServerConnected: boolean
  status: FeatureState
  error: string
}
const initialState: CurrencyState = {
  currencies: [],
  rates: [],
  rateServerConnected: false,
  status: FeatureState.IDLE,
  error: "",
}

export const currencyList = createAsyncThunk<Currency[]>("currency/list", () =>
  getAllCurrencies()
)

export const rateRefresh = createAsyncThunk<Rate[], Rate[]>(
  "rate/refresh",
  (rates) => rates
)

interface IConnectionToggle {
  on: boolean
  dispatch: AppDispatch
}

export const connectionToggle = createAsyncThunk<boolean, IConnectionToggle>(
  "currency/rateServerConnectToggle",
  (toggle) => {
    rateServerConnectToggle(toggle.on, toggle.dispatch)
    return toggle.on
  }
)

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(currencyList.pending, (state) => {
        state.status = FeatureState.LOADING
      })
      .addCase(currencyList.fulfilled, (state, action) => {
        state.status = FeatureState.SUCCEEDED
        state.currencies = action.payload
      })
      .addCase(currencyList.rejected, (state) => {
        state.status = FeatureState.REJECTED
      })
      .addCase(rateRefresh.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.rates.push(...action.payload)
      })
      .addCase(connectionToggle.fulfilled, (state, action) => {
        state.rateServerConnected = action.payload
      })
  },
})

export default currencySlice.reducer
