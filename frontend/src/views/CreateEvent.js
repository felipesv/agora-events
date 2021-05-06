import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';

import { createNewEvent } from "../services/eventServices";
import '@stylesViews/CreateEvent.scss';
import { MdLocationOn } from "react-icons/md";
import { MdTitle } from "react-icons/md";
import { isLoggedIn } from '../utils/authUtils';
import Swal from 'sweetalert2';

export const CreateEvent = (props) => {
  const events = useSelector(state => state.events.events)

  useEffect( () => {
    if (!isLoggedIn())
      location.href = '/myevents';

    if (props.error) Swal.fire({
      title: 'Error!',
      text: props.error.message,
      icon: 'error',
      confirmButtonColor: '#57d2b2',
    })

    if (props.newEvent) 
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        confirmButtonColor: '#57d2b2',
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/myevents';
        }
      });
  }, [props.error, props.newEvent]);

  const [newEvent, setNewEvent] = useState({
    title: "", description: "", date: "",
    time: "", duration: "", onsite: "",
    venue: "", capacity: -1, format: "",
    limit: ""
  });

  const handleInputChange = (event) => {
    let value = event.target.value;
    let capacity = newEvent.capacity;

    if (['radioSt', 'radioVr', 'limited', 'unlimited'].includes(event.target.id)) {
      value = ('true' === event.target.value)
      if (['limited'].includes(event.target.id)) {
        capacity = 1;
        console.log("=========NEW",newEvent)
      } else if (['unlimited'].includes(event.target.id)) {
        capacity = -1;
      }
    }

    setNewEvent({
      ...newEvent,
      capacity: capacity,
      [event.target.name]: value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createNewEvent(newEvent);
  };

  return (
    <React.Fragment>
      <div className="is-flex is-align-items-center is-flex-direction-column py-6">
        <h1 className="title is-4 is-uppercase">Create a new event</h1>
        <form onSubmit={handleSubmit} className="form-width">
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
                <input type="radio" id='formatH' name="format" onChange={handleInputChange} value="hours"/>
                &nbsp;Hours
              </label>
              <label className="radio">
                <input type="radio" id='formatD' name="format" onChange={handleInputChange} value="days"/>
                &nbsp;Days
              </label>
            </div>
          </div>
          {/* ONSITE */}
          <div className="mt-2">
            <label className="has-text-weight-bold">Venue type:</label>
            <div className="control">
              <label className="radio">
                <input type="radio" id='radioVr' name="onsite" onChange={handleInputChange} value={false}/>
                &nbsp;Virtual
              </label>
              <label className="radio">
                <input type="radio" id='radioSt' name="onsite" onChange={handleInputChange} value={true}/>
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
              <button type="submit" className="button is-primary mx-1">CREATE</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );

};

CreateEvent.defaultProps = {
  createNewEvent: () => {},
};

CreateEvent.propTypes = {
  createNewEvent: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    event: state.events.events,
    loadingEvent: state.events.loading,
    error: state.events.error,
    newEvent: state.events.event
  };
};

const mapDispatchToProps = {
  createNewEvent: createNewEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
