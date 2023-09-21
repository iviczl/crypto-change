import { Link } from "react-router-dom"
import { useAppDispatch } from "../hooks/useTypeSelector"
import { logout } from "../stores/userSlice"
import store from "../stores/store"

export default function NavBar() {
  return (
    <nav className="d-flex">
      <p className="text-center m-0 p-1">{store.getState().user.user?.name}</p>
      <ul className="nav">
        {/* <li className="nav-item ">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li> */}
        <li className="nav-item ">
          <Link
            to="/login"
            onClick={(e) => useAppDispatch()(logout())}
            className="nav-link"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}
