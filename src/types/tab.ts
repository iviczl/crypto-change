import { Currency } from './currency'

export default interface ITab {
  id: string
  tabIndex: number
  active: boolean
  title: string
  currency: Currency | undefined
}
