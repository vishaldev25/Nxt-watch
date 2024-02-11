import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {FaMoon, FaSun, FaHome, FaFire, FaGamepad, FaSave} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {IoMdClose} from 'react-icons/io'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const websiteLogoImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const buttonClassname = isDarkTheme
        ? 'dark-theme-button'
        : 'light-theme-button'

      const navbarBGClass = isDarkTheme
        ? 'navbar-bg-dark-theme'
        : 'navbar-bg-light-theme'

      const navHeading = isDarkTheme ? 'dark-heading' : 'light-heading'

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onClickChangeTheme = () => {
        toggleTheme()
      }

      return (
        <nav className={`nav-header ${navbarBGClass}`}>
          <div className="nav-content">
            <div className="nav-bar-mobile-logo-container">
              <Link to="/">
                <img
                  className="website-logo"
                  src={websiteLogoImage}
                  alt="website logo"
                />
              </Link>

              <ul className="nav-menu-mobile-list">
                <li className="nav-menu-item">
                  <button
                    data-testid="theme"
                    type="button"
                    className="icons-button"
                    onClick={onClickChangeTheme}
                  >
                    {isDarkTheme ? (
                      <FaSun className="sun" size="25" color="#ffffff" />
                    ) : (
                      <FaMoon size="25" />
                    )}
                  </button>
                </li>

                <li className="nav-menu-item">
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="icons-button">
                        {isDarkTheme ? (
                          <GiHamburgerMenu size="25" color="#ffffff" />
                        ) : (
                          <GiHamburgerMenu size="25" />
                        )}
                      </button>
                    }
                  >
                    {close => (
                      <div className={`harmburger-container ${navbarBGClass}`}>
                        <div className="closing-button-placement">
                          <button
                            type="button"
                            className="icons-button"
                            onClick={() => close()}
                          >
                            {isDarkTheme ? (
                              <IoMdClose size="30" color="#ffffff" />
                            ) : (
                              <IoMdClose size="30" />
                            )}
                          </button>
                        </div>
                        <div className="list-elements-container">
                          <ul className="nav-menu-list-mobile">
                            <li className="nav-menu-item-mobile">
                              <Link to="/" className="nav-link">
                                <div className="harmburger-inner-container">
                                  <FaHome
                                    size="40"
                                    color="#ff0b37"
                                    className="small-icons"
                                  />
                                  <h2
                                    className={` ${navHeading} harmburger-list-heading`}
                                  >
                                    Home
                                  </h2>
                                </div>
                              </Link>
                            </li>

                            <li className="nav-menu-item-mobile">
                              <Link to="/trending" className="nav-link">
                                <div className="harmburger-inner-container">
                                  <FaFire
                                    size="40"
                                    color="#ff0b37"
                                    className="small-icons"
                                  />
                                  <h2
                                    className={` ${navHeading} harmburger-list-heading`}
                                  >
                                    Trending
                                  </h2>
                                </div>
                              </Link>
                            </li>
                            <li className="nav-menu-item-mobile">
                              <Link to="/gaming" className="nav-link">
                                <div className="harmburger-inner-container">
                                  <FaGamepad
                                    size="40"
                                    color="#ff0b37"
                                    className="small-icons"
                                  />
                                  <h2
                                    className={` ${navHeading} harmburger-list-heading`}
                                  >
                                    Gaming
                                  </h2>
                                </div>
                              </Link>
                            </li>
                            <li className="nav-menu-item-mobile">
                              <Link to="/saved-videos" className="nav-link">
                                <div className="harmburger-inner-container">
                                  <FaSave
                                    size="40"
                                    color="#ff0b37"
                                    className="small-icons"
                                  />
                                  <h2
                                    className={` ${navHeading} harmburger-list-heading`}
                                  >
                                    Saved Videos
                                  </h2>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>

              <div>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="icons-button">
                      {isDarkTheme ? (
                        <FiLogOut size="25" color="#ffffff" />
                      ) : (
                        <FiLogOut size="25" />
                      )}
                    </button>
                  }
                >
                  {close => (
                    <div className={`popup-container ${navbarBGClass}`}>
                      <div className="text-center">
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <div className="d-flex flex-row justify-content-center ">
                        <div className="spacing">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>

            <div className="nav-bar-large-container">
              <Link to="/">
                <img
                  className="website-logo"
                  src={websiteLogoImage}
                  alt="website logo"
                />
              </Link>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <button
                    data-testid="theme"
                    type="button"
                    className="icons-button"
                    onClick={onClickChangeTheme}
                  >
                    {isDarkTheme ? (
                      <FaSun className="sun" size="25" color="#ffffff" />
                    ) : (
                      <FaMoon size="25" />
                    )}
                  </button>
                </li>

                <li className="nav-menu-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    width={30}
                    height={30}
                  />
                </li>
              </ul>
              <div>
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={`logout-desktop-btn ${buttonClassname}`}
                    >
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className={`popup-container ${navbarBGClass}`}>
                      <div className="text-center">
                        <p>Are you sure, you want to logout?</p>
                      </div>
                      <div className="d-flex flex-row justify-content-center ">
                        <div className="spacing">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
