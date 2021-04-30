import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEvents } from "../services/eventServices";
import '@stylesViews/Home.scss'


export const Home = (props) => {

  const events = useSelector(state => state.events.events)

  useEffect(() => {
    // getEvents();
    //await props.fetchEvents();
    props.fetchEvents();
  }, []);

  const getEvents = () => {
    props.fetchEvents();
  }

  const printState = () => {
  }
  return (
    <>
    <h1>
      Home
    </h1>

    </>
  );
}

Home.defaultProps = {
  fetchEvents: () => {},
}

Home.propTypes = {
  fetchEvents: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    loadingEvents: state.events.loading
  };
};

const mapDispatchToProps = {
  fetchEvents: fetchEvents,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home
