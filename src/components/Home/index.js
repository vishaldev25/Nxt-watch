import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'
import VideoItem from '../videoItem'

import {Banner, DarkTheme, LightTheme} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import SideBanner from '../SideBanner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    searchInput: '',
    isBannerClosed: false,
  }

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formatted = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        publishedAt: formatDistanceToNow(new Date(each.published_at)),
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        name: each.channel.name,
        profileImgurl: each.channel.profile_image_url,
      }))

      this.setState({
        videosList: formatted,
        apiStatus: apiStatusConstants.success,
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

  onChangeSearch = event => {
    const {videosList} = this.state
    this.setState({searchInput: event.target.value})
    const filterd = videosList.filter(each =>
      each.title.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({videosList: filterd})
  }

  onSearch = () => {
    this.getAllVideos()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onSearch()
    }
  }

  onClickRetrySearch = () => {
    this.onSearch()
  }

  renderSearchFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const videoDetailsBGClass = isDarkTheme
          ? 'video-details-bg-dark-theme'
          : 'video-details-bg-light-theme'

        return (
          <div className={`${videoDetailsBGClass}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              width={250}
              height={250}
            />
            <h1>No Search results found </h1>
            <p>Try different key words or remove search filter</p>
            <button
              type="button"
              onClick={this.onClickRetrySearch}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div>
        <input
          type="search"
          placeholder="Search"
          onChange={this.onChangeSearch}
          value={searchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          onClick={this.onSearch}
          data-testid="searchButton"
        >
          <AiOutlineSearch aria-label="search" size={20} />
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {videosList} = this.state
    return (
      <div>
        {this.renderSearchInput()}
        {videosList.length === 0 ? (
          this.renderSearchFailureView()
        ) : (
          <ul>
            {videosList.map(each => (
              <VideoItem key={each.id} videoDetails={each} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  onClickRetry = () => {
    this.getAllVideos()
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
            <img
              src={notFoundImage}
              alt="failure view"
              width={250}
              height={250}
            />
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

  onClickCloseButton = () => {
    this.setState({isBannerClosed: true})
  }

  renderBannerSection = () => (
    <Banner data-testid="banner">
      <div className="d-flex flex-row justify-content-between">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="website-logo"
        />
        <button
          type="button"
          data-testid="close"
          onClick={this.onClickCloseButton}
        >
          <IoMdClose size="25" aria-label="close" />
        </button>
      </div>
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button type="button">GET IT NOW</button>
    </Banner>
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
    const {isBannerClosed} = this.state
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
                  <DarkTheme data-testid="home">
                    {isBannerClosed ? ' ' : this.renderBannerSection()}
                    {this.renderTotal()}
                  </DarkTheme>
                ) : (
                  <LightTheme data-testid="home">
                    {isBannerClosed ? ' ' : this.renderBannerSection()}
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
export default Home
