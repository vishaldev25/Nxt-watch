import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {videoDetails} = props
  const {id, thumbnailUrl, title, viewCount} = videoDetails

  return (
    <li>
      <Link to={`videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          width={350}
          height={350}
        />
        <div>
          <p>{title}</p>
          <p>{viewCount} Watching Worldwide</p>
        </div>
      </Link>
    </li>
  )
}
export default VideoItem
