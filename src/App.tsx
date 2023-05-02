import Login from "./components/Login";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

function App() {
  const tabs = [
    { id: "A", tabIndex: 0, active: true, title: "A currency" },
    { id: "B", tabIndex: 1, active: false, title: "B currency" },
    { id: "C", tabIndex: 2, active: false, title: "C currency" },
  ];
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
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home tabs={tabs} />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
