import { Currency } from "./currency";

export interface IUser {
  name: string,
  rights: string[],
  activeCurrencies: Currency[]
}

