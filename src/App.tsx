import Login from "./pages/Login"
import { Route, Routes, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home"
import ProtectedRoute from "./pages/ProtectedRoute"
import { AppStoreState } from "./stores/store"
import { useAppDispatch } from "./hooks/useTypeSelector"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { currencyList } from "./stores/currencySlice"
import { connectRateServer } from "./services/rateServerHandler"
import NavBar from "./components/NavBar"

function App() {
  const user = useSelector((state: AppStoreState) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    async function initCurrencies() {
      await dispatch(currencyList())
      await connectRateServer(dispatch)
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
    <>
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
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
