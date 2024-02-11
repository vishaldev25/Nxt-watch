import Header from '../Header'
import SideBanner from '../SideBanner'
import EmptySavedVideosView from '../EmptySavedVideosView'
import SavedVideosView from '../SavedVideosView'
import ThemeContext from '../../context/ThemeContext'

import {DarkTheme, LightTheme} from './styledComponents'

import './index.css'

const SavedVideos = () => (
  <>
    <Header />
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, savedVideosList} = value

        const showEmptyView = savedVideosList.length === 0

        return (
          <div className="d-flex flex-row">
            <SideBanner />
            {isDarkTheme ? (
              <DarkTheme data-testid="savedVideos" className="home-container">
                {showEmptyView ? <EmptySavedVideosView /> : <SavedVideosView />}
              </DarkTheme>
            ) : (
              <LightTheme data-testid="savedVideos" className="home-container">
                {showEmptyView ? <EmptySavedVideosView /> : <SavedVideosView />}
              </LightTheme>
            )}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  </>
)

export default SavedVideos
