import { useAppDispatch } from "../hooks/useTypeSelector"
import { connectionToggle } from "../stores/currencySlice"
import { AppStoreState } from "../stores/store"
import { useSelector } from "react-redux"

export default function Connection() {
  const dispatch = useAppDispatch()
  const isConnected = useSelector(
    (state: AppStoreState) => state.currency.rateServerConnected
  )

  const toggleConnect = async () => {
    dispatch(connectionToggle({ on: !isConnected, dispatch }))
  }

  return (
    <p className="py-5">
      <div className="mx-auto pt-2">
        {isConnected
          ? "The application is connected to the rate server"
          : "There is no server connection"}
      </div>
      <div className="mx-auto pt-2" style={{ width: "200px" }}>
        <button className="btn btn-primary" onClick={toggleConnect}>
          {isConnected ? "Close server connection" : "Connect to server"}
        </button>
      </div>
    </p>
  )
}
