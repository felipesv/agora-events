import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import '@stylesComponents/Event.scss';

export const Event = (props) => {

  const events = props.listEvents;
  const history = useHistory();

  function handleDetail(id) {
    history.push({
      pathname: "/eventdetail",
      state: {
        event: id
      }
    });
  }

	return (
    <React.Fragment>
      {events 
        ? events.map((event, i) => <div key={i} onClick={() => handleDetail(event._id)}>{event.title}</div>)
        : <></>}
    </React.Fragment>
  );
};

Event.defaultProps = {
	listEvents: null
};

Event.propTypes = {
	listEvents: PropTypes.array
};

export default Event;
