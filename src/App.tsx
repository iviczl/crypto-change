import "bootstrap/dist/css/bootstrap.min.css"
import "./pages/css/styles.css"
import Login from "./pages/Login"
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import ProtectedRoute from "./pages/ProtectedRoute"
import { AppStoreState } from "./stores/store"
import { useAppDispatch } from "./hooks/useTypeSelector"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { connectionToggle, currencyList } from "./stores/currencySlice"
import NavBar from "./components/NavBar"
import Connection from "./pages/Connection"

function App() {
  const user = useSelector((state: AppStoreState) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function initCurrencies() {
      await dispatch(currencyList())
      await dispatch(connectionToggle({ on: true, dispatch }))
    }
    initCurrencies()
  }, [])

  useEffect(() => {
    if (!!user) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [user])

  return (
    <div className="d-flex flex-column align-items-center">
      {user && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connection"
          element={
            <ProtectedRoute>
              <Connection />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
