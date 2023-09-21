import { rateRefresh } from "../stores/currencySlice"
import store, { AppDispatch } from "../stores/store"
import { Currency } from "../types/currency"
import { Rate } from "../types/rate"

export async function connectRateServer(dispatch: AppDispatch) {
  /// TODO create code for a real server connection
  refreshRates(dispatch)
  setInterval(() => {
    refreshRates(dispatch)
  }, 60000)
}

function refreshRates(dispatch: AppDispatch) {
  const currencyState = store.getState().currency
  const currencies = currencyState.currencies
  const rates = currencyState.rates
  const newRates: Rate[] = []

  const refreshTime = Date.now()
  for (const currency of currencies) {
    const lastRate = getLastRate(rates, currency)
    const rateChange = (Math.random() / 100) * (Math.random() > 0.5 ? 1 : -1)
    const rate: Rate = {
      currencyCode: currency.code,
      exchangeValue:
        Math.round((lastRate.exchangeValue + rateChange) * 10000) / 10000,
      time: refreshTime,
    }
    newRates.push(rate)
  }
  dispatch(rateRefresh(newRates))
}

export function getLastRate(rates: Rate[], currency: Currency) {
  return rates
    .filter((rate) => rate.currencyCode === currency.code)
    .reduce(
      (previousRate, currentRate) =>
        previousRate.time < currentRate.time ? currentRate : previousRate,
      { currencyCode: currency.code, exchangeValue: 1, time: 0 }
    )
}

export function getLastMinMaxRates(
  rates: Rate[],
  currency: Currency,
  before: number
) {
  return rates
    .filter(
      (rate) =>
        rate.currencyCode === currency.code && rate.time >= Date.now() - before
    )
    .reduce(
      (result, currentRate) => ({
        max:
          result.max.exchangeValue < currentRate.exchangeValue
            ? currentRate
            : result.max,
        min:
          result.min.exchangeValue > currentRate.exchangeValue
            ? currentRate
            : result.min,
      }),
      {
        max: { currencyCode: currency.code, exchangeValue: -Infinity, time: 0 },
        min: { currencyCode: currency.code, exchangeValue: Infinity, time: 0 },
      }
    )
}
