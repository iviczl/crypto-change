import { useContext } from 'react'
import { CurrencyDataContext } from '../components/CurrencyDataProvider'

// a custom hook to access the currency data context
export const useCurrencyDataContext = () => useContext(CurrencyDataContext)
