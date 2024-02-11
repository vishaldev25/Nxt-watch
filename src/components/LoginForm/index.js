import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

class LoginForm extends Component {
  state = {
    clickedToShowPassword: false,
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const choose = isDarkTheme ? 'input-label-dark' : 'input-label-light'
          return (
            <>
              <label htmlFor="username" className={`input-label ${choose}`}>
                USERNAME
              </label>
              <input
                id="username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={this.onChangeUsername}
                className={`username-input-field ${choose}`}
              />
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    const {clickedToShowPassword} = this.state
    const typeValue = clickedToShowPassword ? 'text' : 'password'

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const choose = isDarkTheme ? 'input-label-dark' : 'input-label-light'
          return (
            <>
              <label htmlFor="password" className={`input-label ${choose}`}>
                PASSWORD
              </label>
              <input
                id="password"
                placeholder="Password"
                type={typeValue}
                value={password}
                onChange={this.onChangePassword}
                className={`username-input-field ${choose}`}
              />
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showErrorMessage: true, errorMessage})
  }

  submitForm = async event => {
    event.preventDefault()
    const {password, username} = this.state
    const userDetails = {password, username}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onShowPassword = () => {
    this.setState(prev => ({
      clickedToShowPassword: !prev.clickedToShowPassword,
    }))
  }

  renderToShowPassword = () => {
    const {clickedToShowPassword} = this.state
    return (
      <div className="showPasswordcont">
        <input
          id="show"
          type="checkbox"
          onClick={this.onShowPassword}
          value={clickedToShowPassword}
        />
        <label htmlFor="show" className="">
          Show Password
        </label>
      </div>
    )
  }

  render() {
    const {showErrorMessage, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? 'dark-theme' : 'light-theme'
          const logoImage = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const formBg = isDarkTheme ? 'form-bg-dark' : 'form-bg-light'

          return (
            <div className={`login-form-container ${bgColor}`}>
              <form
                onSubmit={this.submitForm}
                className={`form-container ${formBg}`}
              >
                <img
                  src={logoImage}
                  alt="website logo"
                  className="login-website-logo-desktop-img"
                />
                <div className="input-container">{this.renderUsername()}</div>
                <div className="input-container">{this.renderPassword()}</div>
                <div className="input-container">
                  {this.renderToShowPassword()}
                </div>

                <button type="submit" className="login-button">
                  Login
                </button>
                {showErrorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm
