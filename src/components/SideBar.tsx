import { useEffect, useState } from 'react'
import store, { AppStoreState } from '../stores/store'
import { Currency } from '../types/currency'
import { useSelector } from 'react-redux'
import { getLastMinMaxRates, getLastRate } from '../services/rateServerHandler'

function SideBar() {
  const currencyStore = store.getState().currency
  const [currencies] = useState(currencyStore.currencies)
  const rates = useSelector((state: AppStoreState) => state.currency.rates)

  function currencyRate(currency: Currency) {
    const lastMinMaxRates = getLastMinMaxRates(rates, currency, 60000)
    return (
      <li
        className="list-group-item d-flex flex-row align-items-center"
        key={currency.code}
      >
        <div className="fw-bold p-1">{currency.code}</div>
        <div>
          <div>
            <img
              src="caret-down-fill.svg"
              title="last minute minimum exchange rate value for the currency"
            />
            {lastMinMaxRates?.min.exchangeValue}
          </div>
          <div>
            <img
              src="caret-up-fill.svg"
              title="last minute maximum exchange rate value for the currency"
            />
            {lastMinMaxRates?.max.exchangeValue}
          </div>
        </div>
      </li>
    )
  }

  return (
    <ul className="list-group list-group-flush p-0 ms-1 side-bar">
      {currencies.map((currency) => currencyRate(currency))}
    </ul>
  )
}

export default SideBar
