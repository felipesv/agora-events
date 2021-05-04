import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';

import { createNewEvent } from "../services/eventServices";
import '@stylesViews/Home.scss';


export const CreateEvent = (props) => {
  const events = useSelector(state => state.events.events)

  useEffect( () => {
    
  }, []);

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
      <h1>NEW EVENT</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="description">Description:</label>
        <textarea type="text" id="description" name="description" onChange={handleInputChange}></textarea><br/><br/>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="time">Hour:</label>
        <input type="time" id="time" name="time" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="duration">Duration</label>
        <input type="number" id="duration" name="duration" onChange={handleInputChange}/><br/><br/>
        <select id="duration" name="format" onChange={handleInputChange}>
          <option value="">Select format</option>
          <option value="days">days</option>
          <option value="hours">hours</option>
        </select><br/><br/>
        <div>
          <input type="radio" id="radioVr" name="onsite" onChange={handleInputChange} value={false}/>
          <label htmlFor="radioVr">Virtual</label>
        </div><br/><br/>
        <div>
          <input type="radio" id="radioSt" name="onsite" onChange={handleInputChange} value={true}/>
          <label htmlFor="radioSt">On Site</label>
        </div><br/><br/>
        <label htmlFor="venue">Venue</label>
        <input type="text" id="venue" name="venue" onChange={handleInputChange}/><br/><br/>
        <div>
          <input type="radio" id='unlimited' name="limit" onChange={handleInputChange} value={false} checked={newEvent.limit ? false : true}/>
          <label htmlFor="virtual">Unlimited</label>
        </div><br/><br/>
        <div>
          <input type="radio" id='limited' name="limit" onChange={handleInputChange} value={true} checked={newEvent.limit}/>
          <label htmlFor="novirtual">limited</label>
        </div><br/><br/>
        <label htmlFor="capacity">Capacity</label>
        <input type="number" id="capacity" name="capacity" min="1" value={newEvent.limit ? (newEvent.capacity < 0 ? 1 : newEvent.capacity) : ''} disabled={newEvent.limit ? false : true} onChange={handleInputChange}/><br/><br/>
        <button type="submit" className="is-primary">CREATE</button>
      </form>
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
    loadingEvent: state.events.loading
  };
};

const mapDispatchToProps = {
  createNewEvent: createNewEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
