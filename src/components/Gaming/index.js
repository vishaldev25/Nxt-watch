import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBanner from '../SideBanner'
import ThemeContext from '../../context/ThemeContext'
import GamingItem from '../GamingItem'

import {LightTheme, DarkTheme} from './styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideosList: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedVideos = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      console.log(updatedVideos)
      this.setState({
        apiStatus: apiStatusConstants.success,
        gamingVideosList: updatedVideos,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {gamingVideosList} = this.state
    return (
      <ul>
        {gamingVideosList.map(each => (
          <GamingItem key={each.id} videoDetails={each} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getGamingVideos()
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const videoDetailsBGClass = isDarkTheme
          ? 'video-details-bg-dark-theme'
          : 'video-details-bg-light-theme'

        const notFoundImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className={`video-details-container ${videoDetailsBGClass}`}>
            <img src={notFoundImage} alt="failure view" />
            <h1>Oops! Something went wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              type="button"
              onClick={this.onClickRetry}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderTotal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <ThemeContext.Consumer>
          {value => {
            const {isDarkTheme} = value
            return (
              <div className="d-flex flex-row">
                <SideBanner />
                {isDarkTheme ? (
                  <DarkTheme data-testid="gaming" className="home-container">
                    {this.renderTotal()}
                  </DarkTheme>
                ) : (
                  <LightTheme data-testid="gaming" className="home-container">
                    {this.renderTotal()}
                  </LightTheme>
                )}
              </div>
            )
          }}
        </ThemeContext.Consumer>
      </>
    )
  }
}

export default Gaming
