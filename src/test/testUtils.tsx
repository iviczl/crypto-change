import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import currencyReducer from '../stores/currencySlice'
import userReducer from '../stores/userSlice'

export function renderWithRouterAndStoreProvider(
  ui: React.ReactElement,
  {
    preloadedState: Object = {},
    store = configureStore({
      reducer: {
        user: userReducer,
        currency: currencyReducer,
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: JSX.Element }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
