import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {FaSave} from 'react-icons/fa'

import Header from '../Header'
import SideBanner from '../SideBanner'
import ThemeContext from '../../context/ThemeContext'

import {LightTheme, DarkTheme} from './styledComponents'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inPrgoress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetailsList: [],
    isLiked: false,
    isDisLiked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inPrgoress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        id: data.video_details.id,
        description: data.video_details.description,
        publishedAt: formatDistanceToNow(
          new Date(data.video_details.published_at),
        ),
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
        name: data.video_details.channel.name,
        profileImgUrl: data.video_details.channel.profile_image_url,
        subscribers: data.video_details.channel.subscriber_count,
      }
      this.setState({
        videoDetailsList: formattedData,
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

  onClickRetry = () => {
    this.getVideoDetails()
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
            <h1>Oops! Something Went Wrong</h1>
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

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {addSavedVideosList} = value
        const {videoDetailsList} = this.state
        const {
          videoUrl,
          title,
          viewCount,
          publishedAt,
          profileImgUrl,
          name,
          subscribers,
          description,
        } = videoDetailsList

        const onSave = async () => {
          const {isSaved} = this.state
          if (isSaved) {
            await this.setState({isSaved: false})
          } else {
            await this.setState({isSaved: true})
          }
        }

        const onClickSave = () => {
          onSave()
          addSavedVideosList(videoDetailsList)
        }

        const onClickLike = () => {
          const {isLiked, isDisLiked} = this.state
          if (isDisLiked) {
            this.setState({isDisLiked: false})
          }
          if (isLiked) {
            this.setState({isLiked: false})
          } else {
            this.setState({isLiked: true})
          }
        }

        const onClickDisLike = () => {
          const {isLiked, isDisLiked} = this.state
          if (isLiked) {
            this.setState({isLiked: false})
          }
          if (isDisLiked) {
            this.setState({isDisLiked: false})
          } else {
            this.setState({isDisLiked: true})
          }
        }

        const {isLiked, isDisLiked, isSaved} = this.state

        const saveColor = isSaved ? '#2563eb' : '#64748b'
        const savedText = isSaved ? 'Saved' : 'Save'
        const likedColor = isLiked ? '#2563eb' : '#64748b'
        const likeClassname = isLiked ? 'liked-color' : 'normal-color'
        const dislikeClassname = isDisLiked ? 'liked-color' : 'normal-color'
        const saveClassname = isSaved ? 'liked-color' : 'normal-color'
        const disLikedColor = isDisLiked ? '#2563eb' : '#64748b'
        return (
          <div>
            <ReactPlayer url={videoUrl} controls width={300} />
            <div>
              <p>{title}</p>
              <p>{viewCount} views</p>
              <p>{publishedAt}</p>

              <div>
                <div className="d-flex flex-row">
                  <button
                    type="button"
                    onClick={onClickLike}
                    className="buttons-likes"
                  >
                    <span className={likeClassname}>
                      <AiOutlineLike color={likedColor} />
                      Like
                    </span>
                  </button>
                </div>
                <div className="d-flex flex-row">
                  <button
                    type="button"
                    onClick={onClickDisLike}
                    className="buttons-likes"
                  >
                    <span className={dislikeClassname}>
                      <AiOutlineDislike color={disLikedColor} />
                      Dislike
                    </span>
                  </button>
                </div>
                <div className="d-flex flex-row">
                  <button
                    type="button"
                    onClick={onClickSave}
                    className="buttons-likes"
                  >
                    <span className={saveClassname}>
                      <FaSave color={saveColor} /> {savedText}
                    </span>
                  </button>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-row">
                <img
                  src={profileImgUrl}
                  alt="channel logo"
                  width={75}
                  height={75}
                />
                <div>
                  <p>{name}</p>
                  <p>{subscribers} subscribers</p>
                </div>
              </div>
              <p>{description}</p>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inPrgoress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
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
                  <DarkTheme
                    data-testid="videoItemDetails"
                    className="home-container"
                  >
                    {this.renderAll()}
                  </DarkTheme>
                ) : (
                  <LightTheme
                    data-testid="videoItemDetails"
                    className="home-container"
                  >
                    {this.renderAll()}
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

export default VideoItemDetails
