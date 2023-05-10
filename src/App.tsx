import Login from "./pages/Login";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import ITab from "./types/ITab";

function App() {
  const tabs: ITab[] = [
    {
      id: "A",
      tabIndex: 0,
      active: true,
      title: "A currency",
      currency: { name: "A curr", code: "A" },
    },
    {
      id: "B",
      tabIndex: 1,
      active: false,
      title: "B currency",
      currency: { name: "B curr", code: "B" },
    },
    {
      id: "C",
      tabIndex: 2,
      active: false,
      title: "C currency",
      currency: { name: "C curr", code: "C" },
    },
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
