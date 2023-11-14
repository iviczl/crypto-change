import { useState } from 'react'
import store, { AppStoreState } from '../stores/store'
import { Currency } from '../types/currency'
import { useSelector } from 'react-redux'
import { getLastMinMaxRates } from '../services/rateServerHandler'
import { Rate } from '../types/rate'
import { useQuery } from '@tanstack/react-query'
import { currencyDataQueryKey } from './CurrencyDataProvider'
import { Loading } from './Loading'
// import { useQuery } from '@tanstack/react-query'
// import { currencyDataQueryKey } from './CurrencyDataProvider'

function SideBar() {
  const currencyStore = store.getState().currency
  const [currencies] = useState(currencyStore.currencies)
  const {
    data: rates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: currencyDataQueryKey,
    staleTime: Infinity,
    // cacheTime: Infinity,
    initialData: new Array<Rate>(),
  })
  // const rates = useSelector((state: AppStoreState) => state.currency.rates)

  function currencyRate(currency: Currency) {
    const lastMinMaxRates = getLastMinMaxRates(rates, currency, 60000)
    return (
      <li
        className="list-group-item d-flex flex-row align-items-center currency-item"
        key={currency.code}
      >
        <div className="fw-bold p-1">{currency.code}</div>
        <div>
          <div title="last minute minimum exchange rate value for the currency">
            <img src="caret-down-fill.svg" />
            {lastMinMaxRates?.min.exchangeValue}
          </div>
          <div title="last minute maximum exchange rate value for the currency">
            <img src="caret-up-fill.svg" />
            {lastMinMaxRates?.max.exchangeValue}
          </div>
        </div>
      </li>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <ul className="list-group list-group-flush p-0 ms-1 side-bar">
      {currencies.map((currency) => currencyRate(currency))}
    </ul>
  )
}

export default SideBar
