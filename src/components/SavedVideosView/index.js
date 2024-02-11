import ThemeContext from '../../context/ThemeContext'

import SavedVideosItem from '../SavedVideosItem'
import './index.css'

const SavedVideosView = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedVideosList} = value

      return (
        <ul>
          {savedVideosList.map(each => (
            <SavedVideosItem key={each.id} savedDetails={each} />
          ))}
        </ul>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideosView
