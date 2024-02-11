import Header from '../Header'
import SideBanner from '../SideBanner'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const homeBGClass = isDarkTheme
          ? 'home-bg-dark-theme'
          : 'home-bg-light-theme'

        const imageValue = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

        return (
          <div className="d-flex flex-row">
            <SideBanner />
            <div
              className={`home-container ${homeBGClass}`}
              data-testid="trending"
            >
              <img src={imageValue} alt="not found" className="notfound-img" />
              <h1 className="notfound-heading">Page Not Found</h1>
              <p className="notfound-desc">
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  </>
)

export default NotFound
