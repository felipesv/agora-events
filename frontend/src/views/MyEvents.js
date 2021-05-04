import React from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEventByAuthor, deleteEvent, updateEvent } from "../services/eventServices";
import '@stylesComponents/EventDetail.scss';

export class MyEvents extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      isActive: [],
      title: "", description: "", date: "",
      time: "", duration: "", onsite: "",
      venue: "", capacity: "", format: "",
      id: "", limit: ""
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchEventByAuthor();
  }

  handleDelete(id) {
    this.props.deleteEvent(id);
  }

  handleOpenModal(event) {
    const eventDate = new Date(event.date);
    const days = eventDate.getDate() <= 9 ? `0${eventDate.getDate()}` : eventDate.getDate();
    const dateE = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${days}`;
    const hours = eventDate.getHours() <= 9 ? `0${eventDate.getHours()}`: eventDate.getHours();
    const minutes = eventDate.getMinutes() <= 9 ? `0${eventDate.getMinutes()}`: eventDate.getMinutes();
    const timeE = `${hours}:${minutes}`;
    document.getElementById("date").defaultValue = dateE;
    document.getElementById("time").defaultValue = timeE;

    this.setState({ 
      id: event._id,  title: event.title,
      description: event.description,
      date: dateE,
      time: timeE,
      duration: event.duration.length,
      onsite: event.onSite,
      venue: event.venue,
      capacity: event.capacity,
      format: event.duration.format,
      limit: event.capacity < 0 ? false : true
    });
  }

  handleCloseModal() {
    this.setState({ 
      isActive: [], title: "", description: "", date: "",
      time: "", duration: "", onsite: "",
      venue: "", capacity: "", format: "",
      id: ""
    });
  }

  handleInputChange(event) {
    let value = event.target.value;

    if (['radioSt', 'radioVr', 'limited', 'unlimited'].includes(event.target.id)) {
      value = ('true' === event.target.value)
      if (['limited'].includes(event.target.id)) {
        this.setState({ capacity: 1 })
      } else if (['unlimited'].includes(event.target.id)) {
        this.setState({ capacity: -1 })
      }
    }
      

    this.setState({
      [event.target.name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateEvent(this.state)
  }

  render() {

    const events = this.props.events;

    if (events)
      return (
        <React.Fragment>
          {events.map((event, i) => 
            <div key={i}>{event.title} 
              <button onClick={() => this.handleDelete(event._id)}>delete</button>
              <button onClick={() => this.handleOpenModal(event)}>update</button>
            </div>)}

            <div className={this.state.id !== "" ? "modal is-active" : "modal"}>
              <div className="modal-background"></div>
              <div className="modal-content">
                <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="title">Title:</label>
                  <input type="text" id='title' name="title" value={this.state.title} onChange={this.handleInputChange}/><br/><br/>
                  <label htmlFor="description">Description:</label>
                  <textarea type="text" id='description' name="description" value={this.state.description} onChange={this.handleInputChange}></textarea><br/><br/>
                  <label htmlFor="date">Date:</label>
                  <input type="date" id='date' name="date" onChange={this.handleInputChange}/><br/><br/>
                  <label htmlFor="time">Hour:</label>
                  <input type="time" id='time' name="time" onChange={this.handleInputChange}/><br/><br/>
                  <label htmlFor="duration">Duration</label>
                  <input type="number" id='duration' name="duration" value={this.state.duration} onChange={this.handleInputChange}/><br/><br/>
                  <div>
                    <input type="radio" id='formatD' name="format" onChange={this.handleInputChange} value="days" checked={this.state.format === "days" ? true : false}/>
                    <label htmlFor="virtual">Days</label>
                  </div><br/><br/>
                  <div>
                    <input type="radio" id='formatH' name="format" onChange={this.handleInputChange} value="hours" checked={this.state.format === "hours" ? true : false}/>
                    <label htmlFor="novirtual">Hours</label>
                  </div><br/><br/>
                  <div>
                    <input type="radio" id='radioVr' name="onsite" onChange={this.handleInputChange} value={false} checked={this.state.onsite ? false : true}/>
                    <label htmlFor="virtual">Virtual</label>
                  </div><br/><br/>
                  <div>
                    <input type="radio" id='radioSt' name="onsite" onChange={this.handleInputChange} value={true} checked={this.state.onsite ? true : false}/>
                    <label htmlFor="novirtual">On Site</label>
                  </div><br/><br/>
                  <label htmlFor="venue">Venue</label>
                  <input type="text" id='venue' name="venue" value={this.state.venue} onChange={this.handleInputChange}/><br/><br/>
                  <div>
                    <input type="radio" id='unlimited' name="limit" onChange={this.handleInputChange} value={false} checked={this.state.limit ? false : true}/>
                    <label htmlFor="virtual">Unlimited</label>
                  </div><br/><br/>
                  <div>
                    <input type="radio" id='limited' name="limit" onChange={this.handleInputChange} value={true} checked={this.state.limit}/>
                    <label htmlFor="novirtual">limited</label>
                  </div><br/><br/>
                  <label htmlFor="capacity">Capacity</label>
                  <input type="number" id='capacity' name="capacity" value={this.state.limit ? (this.state.capacity < 0 ? 1 : this.state.capacity) : ''} min='1' disabled={this.state.limit ? false : true} onChange={this.handleInputChange}/><br/><br/>
                  <button type="submit" className="is-primary">UPDATE</button>
                </form>
                </div>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={() => this.handleCloseModal()}></button>
            </div>
        </React.Fragment>
      );
    return (
      <h1>EVENTS NOT FOUND</h1>
    )
  }
}

MyEvents.defaultProps = {
	fetchEventByAuthor: () => {},
  deleteEvent: () => {},
  updateEvent: () => {},
};

MyEvents.propTypes = {
	fetchEventByAuthor: PropTypes.func,
  deleteEvent: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loadingEvent: state.events.loading,
    success: state.events.success
  };
};

const mapDispatchToProps = {
	fetchEventByAuthor: fetchEventByAuthor,
  deleteEvent: deleteEvent,
  updateEvent: updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
