// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {obj, func2} = props
  const {id, title, date, isStarred} = obj
  const d = new Date(date)
  const formattedDate = format(d, 'd MMMM yyyy, cccc')

  const makeStar = () => {
    func2(id)
  }

  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="listItem">
      <div>
        <p>{title}</p>
        <p>Date:{formattedDate}</p>
      </div>
      <button
        type="button"
        className="starbtn"
        data-testid="star"
        onClick={makeStar}
      >
        <img src={image} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
