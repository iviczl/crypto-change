import { Currency } from "../types/currency";

let currencies: Currency[] = []
const CURRENCIES = 'currencies'
const RATES = 'RATES'

export async function getAllCurrencies() {
  if(currencies.length === 0) {
    const currenciesString = localStorage.getItem(CURRENCIES)
    if(!!currenciesString) {
      currencies = JSON.parse(currenciesString)
    } else {
      currencies =  [
        { name: "A curr", code: "A" },
        { name: "B curr", code: "B" },
        { name: "C curr", code: "C" },
      ] as Currency[];
      localStorage.setItem(CURRENCIES, JSON.stringify(currencies))
    }
  }
  return currencies
}