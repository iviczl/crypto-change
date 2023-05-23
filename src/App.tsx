import Login from "./pages/Login";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import store from "./store";
import { useAppDispatch } from "./hooks/useTypeSelector";
import { logout } from "./userSlice";
import { useEffect, useState } from "react";

function App() {
  const user = store.getState().user.user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
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
              onClick={async () => (user ? await dispatch(logout) : {})}
              className="nav-link"
            >
              {user ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
      </nav>
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
