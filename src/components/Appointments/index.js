import './index.css'
import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', list: [], click: false, titleEl: '', dateEl: ''}

  onSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newItem = {
        id: uuid(),
        title,
        date,
        isStarred: false,
      }
      this.setState(prevState => ({
        list: [...prevState.list, newItem],
        title: '',
        date: '',
        titleEl: '',
        dateEl: '',
      }))
    } else if (title === '' && date !== '') {
      this.setState({titleEl: 'title provided', dateEl: ''})
    } else if (title !== '' && date === '') {
      this.setState({titleEl: '', dateEl: 'date provided'})
    } else {
      this.setState({titleEl: 'title provided', dateEl: 'date provided'})
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  makeStars = id => {
    this.setState(prevState => ({
      list: prevState.list.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return {...eachItem}
      }),
    }))
  }

  onStarredClick = () => {
    this.setState(prevState => ({click: !prevState.click}))
  }

  filter = (list, click) => {
    if (click) {
      return list.filter(eachItem => eachItem.isStarred)
    }
    return list
  }

  render() {
    const {title, date, list, click, titleEl, dateEl} = this.state
    const filteredLst = this.filter(list, click)
    const starred = click ? 'starr' : ''

    return (
      <div className="mainBg">
        <div className="card">
          <h1>Add Appointment</h1>
          <div className="row">
            <form className="inputCont" onSubmit={this.onSubmit}>
              <div className="column">
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="input"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <p>{titleEl}</p>
              </div>
              <div className="column">
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  placeholder="Date"
                  className="input"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <p>{dateEl}</p>
              </div>
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="row">
            <h1>Appointments</h1>
            <button
              type="button"
              className={`btn ${starred}`}
              onClick={this.onStarredClick}
            >
              Starred
            </button>
          </div>
          <ul className="listCont">
            {filteredLst.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                obj={eachItem}
                func2={this.makeStars}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
