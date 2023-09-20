import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCurrencies } from "../services/currency"
import { Currency } from "../types/currency"
import { AppStoreState } from "./store"
import { FeatureState } from "./FeatureState"
import { Rate } from "../types/rate"

type CurrencyState = {
  currencies: Currency[]
  rates: Rate[]
  status: FeatureState
  error: string
}
const initialState: CurrencyState = {
  currencies: [],
  rates: [],
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
        state.rates = action.payload
      })
  },
})

export default currencySlice.reducer
