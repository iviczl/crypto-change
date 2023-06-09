import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllCurrencies } from "../services/currency"
import { Currency } from "../types/currency"
import { AppStoreState } from "./store"
import { FeatureState } from "./FeatureState"
import { Rate } from "../types/rate"


const initialState: {
  currencies: Currency[],
  rates: Rate[],
  status: FeatureState,
  error: string  
} = {
  currencies: [],
  rates: [],
  status: FeatureState.IDLE,
  error: ''
}

export const currencyList = createAsyncThunk<Currency[]>('currency/list', () => getAllCurrencies())

const currencySlice = createSlice({
  name: 'currency',
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
  }
})

export default currencySlice.reducer