import { ReactNode, createContext, useCallback, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useQueryClient } from '@tanstack/react-query'
import config from '../assets/config.json'
import {
  ExrateMessage,
  HelloMessage,
  InMessage,
  OhlcvMessage,
  OutMessage,
  SymbolIdPattern,
  getCurrencyCode,
} from '../types/message'
import { Rate } from '../types/rate'
import { currencies } from '../services/currency'

// a context for currency data
export const CurrencyDataContext = createContext(
  null as {
    canSendMessages: boolean
    sendMessage: (content: any) => void
  } | null
)
const SocketUri = config.api.ws.uri
const apiKey = config.api.key
const MessageType = {
  Error: 'error',
  Hello: 'hello',
  Reconnect: 'reconnect',
  Exrate: 'exrate',
  Ohlcv: 'ohlcv',
}
export const currencyDataQueryKey = ['currency-data']

// the provider component to provide currency data context
export const CurrencyDataProvider = ({ children }: { children: ReactNode }) => {
  const errorHandler = (errorEvent: Event) => {}
  const openHandler = (openEvent: Event): void => {
    const hello = {
      ...HelloMessage,
      apikey: apiKey,
      subscribe_filter_asset_id: currencies.map((currency) => currency.code),
    }
    sM(JSON.stringify(hello))
    console.log('hello sent:', hello)
  }

  // initialize the WebSocket connection and retrieve necessary properties
  const {
    sendMessage: sM,
    lastMessage,
    readyState,
  } = useWebSocket(SocketUri, {
    shouldReconnect: (closeEvent) => (closeEvent.reason === '' ? true : false),
    onError: errorHandler,
    onOpen: openHandler,
  })

  const queryClient = useQueryClient()
  const canSendMessages = readyState === ReadyState.OPEN

  // handle the incoming WebSocket messages
  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const rawData = JSON.parse(lastMessage.data)
      const { type } = rawData as InMessage
      // Update the local messages state based on the message type
      switch (type) {
        case MessageType.Error:
          console.log(rawData)
          break
        case MessageType.Ohlcv:
          console.log('ohlcv')
          const ohlcvMessage = rawData as OhlcvMessage
          const currencyCode = getCurrencyCode(ohlcvMessage)
          if (currencyCode) {
            queryClient.setQueryData(
              currencyDataQueryKey,
              (oldData: Rate[]) => {
                const rate: Rate = {
                  currencyCode: currencyCode,
                  exchangeValue: ohlcvMessage.price_close,
                  time: new Date(ohlcvMessage.time_period_end).getTime(),
                }
                if (oldData) {
                  return [...oldData, rate]
                }
                return [rate]
              }
            )
          }
          break
        case MessageType.Reconnect:
          // queryClient.setQueryData(currencyDataQueryKey, (oldData: any) => {
          //   return [...oldData, message]
          // })
          break
        default:
          break
      }
    }
  }, [lastMessage, queryClient])

  // sendMessage function to send messages through the WebSocket connection
  const sendMessage = useCallback(
    (content: OutMessage) => {
      if (canSendMessages)
        sM(
          JSON.stringify({
            ...content,
          })
        )
    },
    [canSendMessages, sM]
  )

  return (
    <CurrencyDataContext.Provider value={{ canSendMessages, sendMessage }}>
      {children}
    </CurrencyDataContext.Provider>
  )
}
