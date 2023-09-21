import { Link } from "react-router-dom"
import { useAppDispatch } from "../hooks/useTypeSelector"
import { logout } from "../stores/userSlice"
import { MouseEvent } from "react"

export default function NavBar() {
  return (
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
