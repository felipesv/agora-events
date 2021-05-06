import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { deleteEvent, updateEvent } from "../services/eventServices";
import '@stylesComponents/Event.scss';
import { MdDateRange, MdLaptopChromebook, MdPeople, MdLocationOn } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { AiOutlineRise } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import Swal from 'sweetalert2';
import remoteImg from '../assets/images/remote.png';
import onsiteImg from '../assets/images/onsite.png';
import onsiteImg_1 from '../assets/images/onsite_1.png';

export const Event = (props) => {

  useEffect( () => {
    if (props.error) Swal.fire({
      title: 'Error!',
      text: props.error.message,
      icon: 'error',
      confirmButtonColor: '#57d2b2',
    })

    if (props.success) {
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        confirmButtonColor: '#57d2b2',
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/myevents'
        }
      });
    }
  }, [props.error, props.success]);

  const [newEvent, setNewEvent] = useState({
    isActive: [],
    title: "", description: "", date: "",
    time: "", duration: "", onsite: "",
    venue: "", capacity: "", format: "",
    id: "", limit: ""
  });

  const handleInputChange = (event) => {
    let value = event.target.value;

    if (['radioSt', 'radioVr', 'limited', 'unlimited'].includes(event.target.id)) {
      value = ('true' === event.target.value)
      if (['limited'].includes(event.target.id)) {
        setNewEvent({ capacity: 1 })
      } else if (['unlimited'].includes(event.target.id)) {
        setNewEvent({ capacity: -1 })
      }
    }

    setNewEvent({
      ...newEvent,
      [event.target.name]: value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateEvent(newEvent);

  }

  const handleDelete = (id) => {
    props.deleteEvent(id);
  }

  const handleOpenModal = (event) => {
    const eventDate = new Date(event.date);
    const days = eventDate.getDate() <= 9 ? `0${eventDate.getDate()}` : eventDate.getDate();
    const month = eventDate.getMonth() + 1 <= 9 ? `0${eventDate.getMonth() + 1}`: eventDate.getMonth() + 1;
    const dateE = `${eventDate.getFullYear()}-${month}-${days}`;
    const hours = eventDate.getHours() <= 9 ? `0${eventDate.getHours()}`: eventDate.getHours();
    const minutes = eventDate.getMinutes() <= 9 ? `0${eventDate.getMinutes()}`: eventDate.getMinutes();
    const timeE = `${hours}:${minutes}`;
    document.getElementById("date").defaultValue = dateE;
    document.getElementById("time").defaultValue = timeE;

    setNewEvent({
      ...newEvent,
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

  const handleCloseModal = () => {
    setNewEvent({
      ...newEvent, 
      isActive: [], title: "", description: "", date: "",
      time: "", duration: "", onsite: "",
      venue: "", capacity: "", format: "",
      id: ""
    });
  }

  const history = useHistory();

  const handleDetail = (id) => {
    history.push({
      pathname: "/eventdetail",
      state: {
        event: id
      }
    });
  }

  const eventDate = new Date(props.event.date);
  const cursorPointer = props.myEvent ? 'card-content' : 'card-content cursor-pointer';

	return (
    <React.Fragment>
      <div className='column is-4'>
        <div className="card equal-height" key={props.i}>
          <div className="card-image">
            <figure className="image is-4by3">
              { 
                props.event.onSite 
                ?  ( 
                  (Math.random() * 10 < 5)
                    ? <img src={onsiteImg} />
                    : <img src={onsiteImg_1} /> )
                : <img src={remoteImg}/>
              }
            </figure>
          </div>
          <div className={cursorPointer} onClick={ props.myEvent ? () => {} : () => handleDetail(props.event._id)}>
            <div className="media">
              <div className="media-content is-flex is-flex-direction-column is-align-content-space-between	">
                <div className="is-flex is-justify-content-space-between is-align-items-center	mb-2">
                  <div className="is-uppercase has-text-primary is-flex is-align-items-center">
                    <AiOutlineRise className="has-text-primary"/>
                    {props.event.rate}
                  </div> 
                  <div className="is-uppercase has-text-primary is-flex is-align-items-center">
                    <MdDateRange className="has-text-primary"/>
                    {`${eventDate.getFullYear()}-${eventDate.getMonth()+1}-${eventDate.getDate()}`}
                  </div>                  
                </div>
                <div className="title-size is-flex is-justify-content-center is-align-items-center">
                  <h1 className="title is-4 is-uppercase	has-text-centered">{props.event.title}</h1>
                </div>
                <div className="is-flex is-justify-content-space-between is-align-items-center	mb-2">
                  {
                    props.myEvent
                      ? <div className="has-text-link is-flex is-justify-content-space-between is-align-items-center"><IoIosPeople/>{props.event.capacity <= 0 ? 'Unlimited' : props.event.capacity}</div>
                      : <div className="has-text-link is-flex is-justify-content-space-between is-align-items-center"><BsFillPersonFill/>{props.event.author.username}</div>
                  }
                  {
                    props.event.onSite 
                      ? <div className="is-flex is-justify-content-space-between is-align-items-center"><MdPeople/>&nbsp;On-Site</div>
                      : <div className="is-flex is-justify-content-space-between is-align-items-center"><MdLaptopChromebook />&nbsp;Remote</div>
                  }
                </div>
                {
                  props.myEvent
                    ?
                      <div className="is-flex is-align-items-center	mb-2">
                        <React.Fragment><IoMdTime className="has-text-primary"/>{props.event.duration.length}{props.event.duration.format}</React.Fragment>
                      </div>
                    :
                        <></>
                }
                {
                  props.myEvent
                    ?
                      <div className="is-flex is-justify-content-center is-align-items-center	mt-3">
                        <button className="button is-primary mx-1" onClick={() => { handleOpenModal(props.event); }}>Update</button>
                        <button className="button is-danger mx-1" onClick={() => { handleDelete(props.event._id); }}>Delete</button>
                      </div>
                    : 
                      <></>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        props.myEvent
        ?
          <div className={newEvent.id !== "" ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className="box">
                <form onSubmit={handleSubmit}>
                  {/* TITLE */}
                  <div className="mt-2">
                    <label htmlFor="title" className="has-text-weight-bold">Title:</label>
                    <div className="control has-icons-left">
                      <input className="input" type="text" id='title' name="title" placeholder="Title" value={newEvent.title} onChange={handleInputChange}/>
                      <span className="icon is-left">
                        <MdTitle/>
                      </span>
                    </div>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="mt-2">
                    <div className="control">
                      <label htmlFor="description" className="has-text-weight-bold">Description:</label>
                      <textarea className="textarea" id='description' name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Large textarea"></textarea>
                    </div>
                  </div>
                  {/* DATE */}
                  <div className="mt-2">
                    <label htmlFor="title" className="has-text-weight-bold">Date:</label>
                    <div className="control">
                      <input className="input" type="date" id='date' name="date" onChange={handleInputChange}/>
                    </div>
                  </div>
                  {/* TIME */}
                  <div className="mt-2">
                    <label htmlFor="time" className="has-text-weight-bold">Hour:</label>
                    <div className="control">
                      <input className="input" type="time" id='time' name="time" onChange={handleInputChange}/>
                    </div>
                  </div>
                  {/* DURATION */}
                  <div className="mt-2">
                    <label htmlFor="duration" className="has-text-weight-bold">Duration:</label>
                    <div className="control">
                      <input className="input" type="number" id='duration' name="duration" value={newEvent.duration} onChange={handleInputChange}/>
                    </div>
                  </div>
                  {/* FORMAT */}
                  <div className="mt-2">
                    <label className="has-text-weight-bold">Duration format:</label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" id='formatH' name="format" onChange={handleInputChange} value="hours" checked={newEvent.format === "hours" ? true : false}/>
                        &nbsp;Hours
                      </label>
                      <label className="radio">
                        <input type="radio" id='formatD' name="format" onChange={handleInputChange} value="days" checked={newEvent.format === "days" ? true : false}/>
                        &nbsp;Days
                      </label>
                    </div>
                  </div>
                  {/* ONSITE */}
                  <div className="mt-2">
                    <label className="has-text-weight-bold">Venue type:</label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" id='radioVr' name="onsite" onChange={handleInputChange} value={false} checked={newEvent.onsite ? false : true}/>
                        &nbsp;Virtual
                      </label>
                      <label className="radio">
                        <input type="radio" id='radioSt' name="onsite" onChange={handleInputChange} value={true} checked={newEvent.onsite ? true : false}/>
                        &nbsp;On Site
                      </label>
                    </div>
                  </div>
                  {/* VENUE */}
                  <div className="mt-2">
                    <label htmlFor="title" className="has-text-weight-bold">Venue:</label>
                    <div className="control has-icons-left">
                      <input className="input" type="text" id='venue' name="venue" placeholder="Venue" value={newEvent.venue} onChange={handleInputChange}/>
                      <span className="icon is-left">
                        <MdLocationOn/>
                      </span>
                    </div>
                  </div>
                  {/* LIMIT */}
                  <div className="mt-2">
                    <label className="has-text-weight-bold">Limit:</label>
                    <div className="control">
                      <label className="radio">
                        <input type="radio" id='unlimited' name="limit" onChange={handleInputChange} value={false} checked={newEvent.limit ? false : true}/>
                        &nbsp;Unlimited
                      </label>
                      <label className="radio">
                        <input type="radio" id='limited' name="limit" onChange={handleInputChange} value={true} checked={newEvent.limit}/>
                        &nbsp;Limited
                      </label>
                    </div>
                  </div>
                  {/* VENUE */}
                  <div className="mt-2">
                    <label htmlFor="capacity" className="has-text-weight-bold">Capacity:</label>
                    <div className="control has-icons-left">
                      <input className="input" type="text" id='capacity' name="capacity" placeholder="Capacity" value={newEvent.limit ? (newEvent.capacity < 0 ? 1 : newEvent.capacity) : ''} min='1' disabled={newEvent.limit ? false : true} onChange={handleInputChange}/>
                      <span className="icon is-left">
                        <MdLocationOn/>
                      </span>
                    </div>
                  </div>
                  <div className="is-flex is-justify-content-center mt-4">
                      <button type="submit" className="button is-primary mx-1">UPDATE</button>
                      <button type="button" className="button is-danger mx-1" onClick={() => handleCloseModal()}>CANCEL</button>
                  </div>
                </form>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => handleCloseModal()}></button>
          </div>
        :
          <></>
      }
    </React.Fragment>
  );
};

Event.defaultProps = {
	listEvents: null,
  myEvent: false,
  updateClick: () => {},
  deleteEvent: () => {},
  updateEvent: () => {},
};

Event.propTypes = {
	listEvents: PropTypes.array,
  myEvent: PropTypes.bool,
  deleteEvent: PropTypes.func,
  updateEvent: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loadingEvent: state.events.loading,
    success: state.events.success,
    error: state.events.error
  };
};

const mapDispatchToProps = {
  deleteEvent: deleteEvent,
  updateEvent: updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
