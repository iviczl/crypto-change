import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './stores/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CurrencyDataProvider } from './components/CurrencyDataProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CurrencyDataProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CurrencyDataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
