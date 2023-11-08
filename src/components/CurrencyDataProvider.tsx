import { ReactNode, createContext, useCallback, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useQueryClient } from '@tanstack/react-query'
import config from '../assets/config.json'

// a context for currency data
export const CurrencyDataContext = createContext(
  null as {
    canSendMessages: boolean
    sendMessage: (content: any) => void
  } | null
)
const SOCKET_URL = config.api.ws.uri
const MESSAGE_TYPE = {
  ERROR: 'error',
  INITIAL_DATA: 'INITIAL_DATA',
  SEND_MESSAGE: 'SEND_MESSAGE',
  NEW_MESSAGE: 'NEW_MESSAGE',
}
export const queryKey = ['currency-data']

// the provider component to provide currency data context
export const CurrencyDataProvider = ({ children }: { children: ReactNode }) => {
  const errorHandler = (errorEvent: Event) => {}
  // initialize the WebSocket connection and retrieve necessary properties
  const {
    sendMessage: sM,
    lastMessage,
    readyState,
  } = useWebSocket(SOCKET_URL, {
    shouldReconnect: (closeEvent) => (closeEvent.reason === '' ? true : false),
    onError: errorHandler,
  })

  const queryClient = useQueryClient()
  const canSendMessages = readyState === ReadyState.OPEN

  // handle the incoming WebSocket messages
  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      const { type, message } = JSON.parse(lastMessage.data)
      // Update the local messages state based on the message type
      switch (type) {
        case MESSAGE_TYPE.ERROR:
          console.log(message)
          break
        case MESSAGE_TYPE.INITIAL_DATA:
          queryClient.setQueryData(queryKey, () => {
            return message
          })
          break
        case MESSAGE_TYPE.NEW_MESSAGE:
          queryClient.setQueryData(queryKey, (oldData: any) => {
            return [...oldData, message]
          })
          break
        default:
          break
      }
    }
  }, [lastMessage, queryClient])

  // sendMessage function to send messages through the WebSocket connection
  const sendMessage = useCallback(
    (content: any) => {
      if (canSendMessages)
        sM(
          JSON.stringify({
            type: MESSAGE_TYPE.SEND_MESSAGE,
            content,
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
