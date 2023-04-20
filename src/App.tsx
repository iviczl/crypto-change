import { StrictMode } from "react";
import Login from "./components/Login";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="navbar navbar-nav">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar navbar-nav">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
