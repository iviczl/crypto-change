import { useEffect, useState } from "react"
import store, { AppStoreState } from "../stores/store"
import { Currency } from "../types/currency"
import { useSelector } from "react-redux"
import { getLastMinMaxRates, getLastRate } from "../services/rateServerHandler"

function SideBar() {
  const currencyStore = store.getState().currency
  const [currencies] = useState(currencyStore.currencies)
  const rates = useSelector((state: AppStoreState) => state.currency.rates)

  function currencyRate(currency: Currency) {
    const lastMinMaxRates = getLastMinMaxRates(rates, currency, 60000)
    return (
      <li className="list-group-item" key={currency.code}>
        {currency.code}
        <div>
          <div>
            <img></img>
            {lastMinMaxRates?.min.exchangeValue}
          </div>
          <div>
            <img></img>
            {lastMinMaxRates?.max.exchangeValue}
          </div>
        </div>
      </li>
    )
  }

  return (
    <ul className="list-group list-group-flush">
      {currencies.map((currency) => currencyRate(currency))}
    </ul>
  )
}

export default SideBar
