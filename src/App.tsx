import Login from "./components/Login";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="nav-item ">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/login" className="nav-link">
              Login
            </Link>
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
