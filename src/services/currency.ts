import { Currency } from "../types/currency"
import config from "../assets/config.json"

let currencies: Currency[] = []
const CURRENCIES = "currencies"
const RATES = "RATES"
const CRYPTO_TYPE = "type_is_crypto"
const ASSET_ID = "asset_id"
const NAME = "name"

export async function getAllCurrencies() {
  if (currencies.length === 0) {
    const uri = config.api.rest.uri

    const currenciesString = localStorage.getItem(CURRENCIES)
    if (!!currenciesString) {
      currencies = JSON.parse(currenciesString)
    } else {
      currencies = [
        { name: "A currency", code: "A" },
        { name: "B currency", code: "B" },
        { name: "C currency", code: "C" },
        { name: "D currency", code: "D" },
        { name: "E currency", code: "E" },
        { name: "F currency", code: "F" },
        { name: "G currency", code: "G" },
        { name: "H currency", code: "H" },
        { name: "I currency", code: "I" },
        { name: "J currency", code: "J" },
        { name: "K currency", code: "K" },
        { name: "L currency", code: "L" },
        { name: "M currency", code: "M" },
        { name: "N currency", code: "N" },
        { name: "O currency", code: "O" },
        { name: "P currency", code: "P" },
        { name: "Q currency", code: "Q" },
        { name: "R currency", code: "R" },
        { name: "S currency", code: "S" },
        { name: "T currency", code: "T" },
        { name: "U currency", code: "U" },
        { name: "V currency", code: "V" },
        { name: "W currency", code: "W" },
        { name: "X currency", code: "X" },
        { name: "Y currency", code: "Y" },
        { name: "Z currency", code: "Z" },
      ] as Currency[]
      localStorage.setItem(CURRENCIES, JSON.stringify(currencies))
    }
  }
  return currencies
}
