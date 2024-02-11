import {Link} from 'react-router-dom'
import './index.css'

const SavedVideosItem = props => {
  const {savedDetails} = props
  const {id, thumbnailUrl, title, publishedAt, name, viewCount} = savedDetails

  //  function findindex(str) {
  //  const num = /\d/
  //  const nums = str.match(num)
  //  return str.indexOf(nums)
  //  }

  //  const reframeDate = findindex(publishedAt)

  return (
    <Link to={`videos/${id}`}>
      <li className="mb-3">
        <div className="d-flex flex-row">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            width={250}
            height={250}
          />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <p>{viewCount} views</p>
            <p>{publishedAt} </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideosItem
