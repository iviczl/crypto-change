import { useAppDispatch } from '../hooks/useTypeSelector'
import { connectionToggle } from '../stores/currencySlice'
import { AppStoreState } from '../stores/store'
import { useSelector } from 'react-redux'

export default function Connection() {
  const dispatch = useAppDispatch()
  const isConnected = useSelector(
    (state: AppStoreState) => state.currency.rateServerConnected
  )

  const toggleConnect = async () => {
    dispatch(connectionToggle({ on: !isConnected, dispatch }))
  }

  return (
    <div className="py-5 connection-page">
      <div className="mx-auto pt-2">
        {isConnected ? (
          <div>
            <p>The application is connected to the rate server.</p>
            <p>Now exchange rates will be refreshed in every minute.</p>
          </div>
        ) : (
          <p>There is no server connection</p>
        )}
      </div>
      <div className="mx-auto pt-2" style={{ width: '200px' }}>
        <button className="btn btn-primary" onClick={toggleConnect}>
          {isConnected ? 'Close server connection' : 'Connect to server'}
        </button>
      </div>
    </div>
  )
}
