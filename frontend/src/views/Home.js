import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';

import { fetchEvents } from "../services/eventServices";
import '@stylesViews/Home.scss';
import Event from '../components/Event'


export const Home = (props) => {
  const events = useSelector(state => state.events.events)
  useEffect( () => {
    getEvents();
  }, []);

  const getEvents = async () => {
    await props.fetchEvents();
  }

  return (
    <React.Fragment>
      <Event listEvents={props.events}/>
    </React.Fragment>
  );

};

Home.defaultProps = {
  fetchEvents: () => {},
};

Home.propTypes = {
  fetchEvents: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loadingEvents: state.events.loading
  };
};

const mapDispatchToProps = {
  fetchEvents: fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home
