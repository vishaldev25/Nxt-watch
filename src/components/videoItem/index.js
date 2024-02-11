import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {videoDetails} = props
  const {id, thumbnailUrl, title, publishedAt, profileImgurl, name, viewCount} =
    videoDetails

  function findindex(str) {
    const num = /\d/
    const nums = str.match(num)
    return str.indexOf(nums)
  }

  return (
    <Link to={`videos/${id}`}>
      <li>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          width={350}
          height={350}
        />
        <div className="d-flex flex-row">
          <img src={profileImgurl} alt="channel logo" width={30} height={30} />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <p>{viewCount} views</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideoItem
