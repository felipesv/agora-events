import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEventById, attendanceUp, attendanceDown, ratingUp, ratingDown } from "../services/eventServices";
import  { Redirect } from 'react-router-dom';
import '@stylesComponents/EventDetail.scss';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BsFillPersonFill, BsLink45Deg } from "react-icons/bs";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { IoTodaySharp } from "react-icons/io5";
import { isLoggedIn } from '../utils/authUtils';
import Swal from 'sweetalert2';
import remoteImg from '../assets/images/remote.png';
import onsiteImg from '../assets/images/onsite.png';
import onsiteImg_1 from '../assets/images/onsite_1.png';

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

  componentDidUpdate(prevProps) {
    if (this.props.success !== prevProps.success) {
      if (typeof this.props.success !== 'boolean' && this.props.success !== "")
        Swal.fire({
          title: 'Success!',
          text: this.props.success.message,
          icon: 'success',
          confirmButtonColor: '#57d2b2',
        })
    }

    if (this.props.error !== prevProps.error)
      if (typeof this.props.error !== 'boolean' && this.props.error !== "")
        Swal.fire({
          title: 'Hey!',
          text: this.props.error.message,
          icon: 'info',
          confirmButtonColor: '#57d2b2',
        })
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
                { this.props.event.onSite
                  ? ( 
                      (Math.random() * 10 < 5)
                        ? <img className="image img-size" src={onsiteImg} />
                        : <img className="image img-size" src={onsiteImg_1} /> )
                  : <img className="image img-size" src={remoteImg} />
                }
                <div className="detail-width">
                  <h1 className="title is-4 is-uppercase	has-text-centered">{this.props.event.title}</h1>
                  <div className="is-flex is-justify-content-space-between my-2">
                    <div className="is-flex is-align-items-center">
                      <MdDateRange className="has-text-primary"/>
                      {`${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`}
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
                  <div className="is-flex is-justify-content-space-between my-2">
                    <div className="is-flex is-align-items-center">
                      {
                        this.props.event.duration.format === 'hours'
                        ? <React.Fragment><IoMdTime className="has-text-primary"/>{this.props.event.duration.length}{this.props.event.duration.format}</React.Fragment>
                        : <React.Fragment><IoTodaySharp className="has-text-primary"/>{this.props.event.venue}</React.Fragment>
                      }
                    </div>
                    <div className="is-flex is-align-items-center">
                      
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
              <p className="has-text-justified mt-5 mx-6 mb-6">{this.props.event.description}</p>
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
