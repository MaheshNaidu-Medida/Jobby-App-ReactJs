import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>

      <ul className="navbar-menu-mobile">
        <li className="list-item">
          <Link to="/" className="link">
            <AiFillHome className="nav-menu-icon" />
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="link">
            <BsBriefcaseFill className="nav-menu-icon" />
          </Link>
        </li>
        <li className="list-item">
          <FiLogOut className="nav-menu-icon" onClick={onClickLogout} />
        </li>
      </ul>

      <div className="navbar-menu">
        <ul className="navbar-nav-items">
          <Link to="/" className="link">
            <li className="large-link-item">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="large-link-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="navbar-logout" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
