import Login from "./pages/Login";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AppStoreState } from "./stores/store";
import { useAppDispatch } from "./hooks/useTypeSelector";
import { logout } from "./stores/userSlice";
import { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currencyList } from "./stores/currencySlice";

function App() {
  const user = useSelector((state: AppStoreState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function initCurrencies() {
      await dispatch(currencyList());
    }
    initCurrencies();
  }, []);
  useEffect(() => {
    if (!!user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);
  const loggingOut = async (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (!!user) {
      console.log("loggin out");
      await useAppDispatch()(logout());
    }
  };
  return (
    <>
      {!!user ? (
        <nav className="sticky-top">
          <ul className="nav">
            <li className="nav-item ">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/login"
                onClick={async (e) => loggingOut(e)}
                className="nav-link"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
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
  );
}

export default App;
