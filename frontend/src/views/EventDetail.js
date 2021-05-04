import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEventById, attendanceUp, attendanceDown, ratingUp, ratingDown } from "../services/eventServices";
import  { Redirect } from 'react-router-dom'
import '@stylesComponents/EventDetail.scss'

export class EventDetail extends React.Component 
{
  constructor(props) {
    super(props)
    this.attendance = this.attendance.bind(this)
    this.noAttennd = this.noAttennd.bind(this)
    this.rating = this.rating.bind(this)
    this.noRating = this.noRating.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state)
      this.props.fetchEventById(this.props.location.state.event);
  }

  attendance() { 
    this.props.attendanceUp(this.props.event._id)
  }

  noAttennd() {
    this.props.attendanceDown(this.props.event._id)
  }

  rating() {
    this.props.ratingUp(this.props.event._id)
  }

  noRating() {
    this.props.ratingDown(this.props.event._id)
  }

  render() {
    if (!this.props.location.state) 
      return <Redirect to='/'/>

    const event = this.props.event;

    if (event)
      return (
        <React.Fragment>
          <h5>{event.title}</h5>
          <p>{event.description}</p>
          <button type="button" onClick= { () => this.attendance() }>ATTENDANCE</button>
          <button type="button" onClick= { () => this.noAttennd() }>UNDO ATTENDANCE</button>
          <button type="button" onClick= { () => this.rating() }>UP</button>
          <button type="button" onClick= { () => this.noRating() }>DOWN</button>
          { this.props.error ? <p>{this.props.error.message}</p> : <></> }
          { this.props.success ? <p>{this.props.success.message}</p> : <></> }
        </React.Fragment>
      );
    return (
      <h1>DETAIL</h1>
    )
  }
}

EventDetail.defaultProps = {
	fetchEventById: () => {},
  attendanceUp: () => {},
  attendanceDown: () => {},
  ratingUp: () => {},
  ratingDown: () => {}
};

EventDetail.propTypes = {
	fetchEventById: PropTypes.func,
  attendanceUp: PropTypes.func,
  attendanceDown: PropTypes.func,
  ratingUp: PropTypes.func,
  ratingDown: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    loadingEvent: state.events.loading,
    success: state.events.success,
    error: state.events.error
  };
};

const mapDispatchToProps = {
	fetchEventById: fetchEventById,
  attendanceUp: attendanceUp,
  attendanceDown: attendanceDown,
  ratingUp: ratingUp,
  ratingDown: ratingDown
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
