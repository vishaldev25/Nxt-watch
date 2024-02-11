import {Link} from 'react-router-dom'
import {FaHome, FaFire, FaGamepad, FaSave} from 'react-icons/fa'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const sideBanner = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const navbarBGClass = isDarkTheme
        ? 'navbar-bg-dark-theme'
        : 'navbar-bg-light-theme'

      const sideHeadingColor = isDarkTheme
        ? 'side-dark-theme'
        : 'side-light-theme'

      return (
        <div className={`${navbarBGClass} side-bar-container`}>
          <div className="sidebanner-container">
            <ul className="nav-menu-list-mobile">
              <li className="nav-menu-item-mobile">
                <Link to="/" className="nav-link">
                  <div className="harmburger-inner-container">
                    <FaHome size="25" color="#ff0b37" className="small-icons" />
                    <h2 className={`${sideHeadingColor} sidebanner-heading`}>
                      Home
                    </h2>
                  </div>
                </Link>
              </li>

              <li className="nav-menu-item-mobile">
                <Link to="/trending" className="nav-link">
                  <div className="harmburger-inner-container">
                    <FaFire size="25" color="#ff0b37" className="small-icons" />
                    <h2 className={`${sideHeadingColor} sidebanner-heading`}>
                      Trending
                    </h2>
                  </div>
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <Link to="/gaming" className="nav-link">
                  <div className="harmburger-inner-container">
                    <FaGamepad
                      size="25"
                      color="#ff0b37"
                      className="small-icons"
                    />
                    <h2 className={`${sideHeadingColor} sidebanner-heading`}>
                      Gaming
                    </h2>
                  </div>
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <Link to="/saved-videos" className="nav-link">
                  <div className="harmburger-inner-container">
                    <FaSave size="25" color="#ff0b37" className="small-icons" />
                    <h2 className={`${sideHeadingColor} sidebanner-heading`}>
                      Saved Videos
                    </h2>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="contactus-container">
            <p className={`${sideHeadingColor} sidebanner-heading`}>
              CONTACT US
            </p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-logos"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-logos"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-logos"
              />
              <p className={`${sideHeadingColor} contactus-para`}>
                Enjoy! Now to see your channels and recommendations!{' '}
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default sideBanner
