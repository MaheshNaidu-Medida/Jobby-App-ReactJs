import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    isError: false,
    username: '',
    password: '',
    errorMsg: '',
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const jwtToken = fetchedData.jwt_token
      this.onLoginSuccess(jwtToken)
    } else {
      const msg = fetchedData.error_msg
      this.setState({
        isError: true,
        errorMsg: msg,
      })
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isError, userName, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="form-bg-container">
        <form className="form" onSubmit={this.onClickLogin}>
          <div className="app-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="input"
            onChange={this.onChangeUsername}
            value={userName}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="input"
            onChange={this.onChangePassword}
            value={password}
          />

          <button className="logout-button" type="submit">
            Login
          </button>
          {isError ? <p className="error-text">{errorMsg}</p> : null}
        </form>
      </div>
    )
  }
}

export default Login
