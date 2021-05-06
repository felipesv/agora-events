import React from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEventByAuthor } from "../services/eventServices";
import '@stylesComponents/EventDetail.scss';
import ListEvent from '../components/ListEvent';

export class MyEvents extends React.Component 
{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEventByAuthor();
  }

  render() {

    const events = this.props.events;

    if (this.props.events)
      return (
        <React.Fragment>
          <div className="is-flex is-justify-content-center my-6">
            <h1 className="title is-4 is-uppercase">My Events</h1>
          </div>
          { this.props.events
              ? <ListEvent listEvents={this.props.events} myEvent={true} />
              : ''
          }
        </React.Fragment>
      );
    return (
      <h1>EVENTS NOT FOUND</h1>
    )
  }
}

MyEvents.defaultProps = {
	fetchEventByAuthor: () => {},
};

MyEvents.propTypes = {
	fetchEventByAuthor: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  };
};

const mapDispatchToProps = {
	fetchEventByAuthor: fetchEventByAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
