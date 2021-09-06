import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogo = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      history.replace('/login')
    } else {
      history.replace('/')
    }
  }

  const onClickHome = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      history.replace('/login')
    } else {
      history.replace('/')
    }
  }

  const onClickJobs = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      history.replace('/login')
    } else {
      history.replace('/jobs')
    }
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <button
        className="navbar-logo-container"
        type="button"
        onClick={onClickLogo}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </button>
      <div className="navbar-menu-mobile">
        <button
          type="button"
          className="navbar-logo-button"
          onClick={onClickHome}
        >
          <AiFillHome className="nav-menu-icon" />
        </button>
        <button
          type="button"
          className="navbar-logo-button"
          onClick={onClickJobs}
        >
          <BsBriefcaseFill className="nav-menu-icon" />
        </button>
        <button
          type="button"
          className="navbar-logo-button"
          onClick={onClickLogout}
        >
          <FiLogOut className="nav-menu-icon" />
        </button>
      </div>

      <div className="navbar-menu">
        <div className="navbar-nav-items">
          <button className="navbar-button" type="button" onClick={onClickHome}>
            Home
          </button>
          <button className="navbar-button" type="button" onClick={onClickJobs}>
            Jobs
          </button>
        </div>
        <button type="button" className="navbar-logout" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
