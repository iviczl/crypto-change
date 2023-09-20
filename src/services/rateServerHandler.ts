import { rateRefresh } from "../stores/currencySlice"
import store, { AppDispatch } from "../stores/store"
import { Rate } from "../types/rate"

export async function connectRateServer(dispatch: AppDispatch) {
  /// TODO create code for a real server connection
  refreshRates(dispatch)
  setInterval(() => {
    refreshRates(dispatch)
  }, 60000)
}

function refreshRates(dispatch: AppDispatch) {
  const currencies = store.getState().currency.currencies
  const newRates: Rate[] = []
  for (const currency of currencies) {
    const rate: Rate = {
      currencyCode: currency.code,
      valueInUsd: Math.round(Math.random() * 100 * 10000) / 10000,
      time: Date.now(),
    }
    newRates.push(rate)
  }
  dispatch(rateRefresh(newRates))
}
