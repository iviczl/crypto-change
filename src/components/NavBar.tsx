import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useTypeSelector'
import { logout } from '../stores/userSlice'
import store, { AppStoreState } from '../stores/store'
import { useSelector } from 'react-redux'

export default function NavBar() {
  const isConnected = useSelector(
    (state: AppStoreState) => state.currency.rateServerConnected
  )
  return (
    <nav className="d-flex nav-bar m-0">
      <div className="d-flex flex-shrink-1 justify-content-start text-center m-0 p-1">
        <img
          className="m-1"
          src="person-circle.svg"
          title={'User: ' + store.getState().user.user?.name}
        ></img>
        <img
          className={'m-1' + (isConnected ? '' : ' disabled-color')}
          src="globe.svg"
          title={
            isConnected ? 'Connected to exchange rate server' : 'No connection'
          }
        ></img>
      </div>
      <ul className="d-flex w-100 justify-content-end nav">
        <li className="nav-item ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              'nav-link text-dark' + (isActive ? ' fw-bold' : '')
            }
          >
            Data
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink
            to="/connection"
            className={({ isActive }) =>
              'nav-link text-dark' + (isActive ? ' fw-bold' : '')
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
