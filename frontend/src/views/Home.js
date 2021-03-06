import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';

import { fetchEvents } from "../services/eventServices";
import '@stylesViews/Home.scss';
import ListEvent from '../components/ListEvent'


export const Home = (props) => {
  const events = useSelector(state => state.events.events)
  useEffect( () => {
    getEvents();
  }, []);

  const getEvents = async () => {
    await props.fetchEvents();
  }

  return (
    <div className="my-6">
      <ListEvent listEvents={props.events}/>
    </div>
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
