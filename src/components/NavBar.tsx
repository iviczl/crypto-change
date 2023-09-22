import { NavLink } from "react-router-dom"
import { useAppDispatch } from "../hooks/useTypeSelector"
import { logout } from "../stores/userSlice"
import store from "../stores/store"

export default function NavBar() {
  return (
    <nav className="d-flex">
      <div className="text-center m-0 p-1">
        <img src="person-circle.svg" title="name of the logged in user"></img>
        <span className="px-1">{store.getState().user.user?.name}</span>
      </div>
      <ul className="nav">
        <li className="nav-item ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link text-dark" + (isActive ? " fw-bold" : "")
            }
          >
            Data
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/connection"
            className={({ isActive }) =>
              "nav-link text-dark" + (isActive ? " fw-bold" : "")
            }
          >
            Connection
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/login"
            onClick={(e) => useAppDispatch()(logout())}
            className="nav-link text-dark"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
