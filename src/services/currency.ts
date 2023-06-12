import { Currency } from "../types/currency"
import config from '../assets/config.json'

let currencies: Currency[] = []
const CURRENCIES = 'currencies'
const RATES = 'RATES'
const CRYPTO_TYPE = 'type_is_crypto'
const ASSET_ID = 'asset_id'
const NAME = 'name'

export async function getAllCurrencies() {
  if(currencies.length === 0) {
    const uri = config.api.rest.uri
    
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