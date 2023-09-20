import { useEffect, useState } from "react"
import store, { AppStoreState } from "../stores/store"
import { Currency } from "../types/currency"
import { useSelector } from "react-redux"

function SideBar() {
  const currencyStore = store.getState().currency
  const [currencies] = useState(currencyStore.currencies)
  const rates = useSelector((state: AppStoreState) => state.currency.rates)

  function currencyRate(currency: Currency) {
    return (
      <li className="list-group-item" key={currency.code}>
        {currency.code +
          " " +
          rates.find((rate) => rate.currencyCode === currency.code)?.valueInUsd}
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
