import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEventById } from "../services/eventServices";
import  { Redirect } from 'react-router-dom'
import '@stylesComponents/EventDetail.scss'

export class EventDetail extends React.Component 
{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.location.state)
      this.props.fetchEventById(this.props.location.state.event);
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
        </React.Fragment>
      );
    return (
      <h1>DETAIL</h1>
    )
  }
}

EventDetail.defaultProps = {
	fetchEventById: () => {},
};

EventDetail.propTypes = {
	fetchEventById: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    loadingEvent: state.events.loading
  };
};

const mapDispatchToProps = {
	fetchEventById: fetchEventById,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
