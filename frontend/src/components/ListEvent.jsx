import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import '@stylesComponents/Event.scss';
import Event from './Event';

export const ListEvent = (props) => {

  const events = props.listEvents;
  const history = useHistory();

  return (
    <React.Fragment>
      { events 
        ?
          <div className="container">
            <div className="is-flex is-flex-wrap-wrap">
              {events.map((event, i) => <Event key={i} event={event} myEvent={props.myEvent} />)}
            </div>
          </div>
        : 
          <h1>No Events Found</h1>
      }
    </React.Fragment>
  );
};

ListEvent.defaultProps = {
	listEvents: null,
  myEvent: false,
};

ListEvent.propTypes = {
	listEvents: PropTypes.array,
  myEvent: PropTypes.bool
};

export default ListEvent;
