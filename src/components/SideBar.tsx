import { useState } from "react";
import store from "../stores/store";
import { Currency } from "../types/currency";

function SideBar() {
  const [currencies, setCurrencies] = useState(
    store.getState().currency.currencies
  );
  function currencyRate(currency: Currency) {
    return <li key={currency.code}>{currency.code}</li>;
  }

  return <ul>{currencies.map((c) => currencyRate(c))}</ul>;
}

export default SideBar;
