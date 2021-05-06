import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEventById, attendanceUp, attendanceDown, ratingUp, ratingDown } from "../services/eventServices";
import  { Redirect } from 'react-router-dom';
import '@stylesComponents/EventDetail.scss';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BsFillPersonFill, BsLink45Deg } from "react-icons/bs";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { isLoggedIn } from '../utils/authUtils';

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

    if (this.props.event) {
      const eventDate = new Date(this.props.event.date);

      return (
        <React.Fragment>
          <div className="container mt-6">
            <div>
              <div className="is-flex is-justify-content-space-around	px-6">
                <img className="image" src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80" width="400"/>
                <div className="">
                  <h1 className="title is-4 is-uppercase	has-text-centered">{this.props.event.title}</h1>
                  <div className="is-flex is-justify-content-space-between my-2">
                    <div className="is-flex is-align-items-center">
                      <MdDateRange className="has-text-primary"/>
                      {`${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`}
                    </div>
                    <div className="is-flex is-align-items-center">
                      <BsFillPersonFill/>{this.props.event.author.username}
                    </div>
                  </div>
                  <div className="is-flex is-justify-content-space-between my-2">
                    <div className="is-flex is-align-items-center">
                      {
                        this.props.event.onSite
                        ? <React.Fragment><MdLocationOn className="has-text-primary"/>{this.props.event.venue}</React.Fragment>
                        : <React.Fragment><BsLink45Deg className="has-text-primary"/>{this.props.event.venue}</React.Fragment>
                      }
                    </div>
                    <div className="is-flex is-align-items-center">
                      <IoIosPeople/>{this.props.event.capacity <= 0 ? 'Unlimited' : this.props.event.capacity}
                    </div>
                  </div>
                  { isLoggedIn()
                      ?
                        <div className="is-flex is-justify-content-space-between mt-6">
                          <div>
                            <button type="button" onClick= { () => this.rating() } className="button is-primary mr-1"><FaArrowUp/></button>
                            <button type="button" onClick= { () => this.noRating() } className="button is-danger"><FaArrowDown/></button>
                          </div>
                          <div>
                            <button type="button" onClick= { () => this.attendance() } className="button is-primary mr-1">Attend</button>
                            <button type="button" onClick= { () => this.noAttennd() } className="button is-danger">No Attend</button>
                          </div>
                        </div>
                      : 
                        <></>
                  }
                </div>
              </div>
              <p className="has-text-justified mt-5 mx-6">{this.props.event.description}</p>
            </div>  
          </div>
          { this.props.error ? <p>{this.props.error.message}</p> : <></> }
          { this.props.success ? <p>{this.props.success.message}</p> : <></> }
        </React.Fragment>
      );
    }

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
