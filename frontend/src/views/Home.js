import React, { PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchEvents } from "../actions/eventActionCreator";
import '@stylesViews/Home.scss'

export class Home extends PureComponent {
  
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  render () {
    return (
      <h1>Home</h1>
    );
  } 
}

Home.defaultProps = {
  fetchEvents: () => {},
}

Home.propTypes = {
  fetchEvents: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    events: state.event
  };
};

const mapDispatchToProps = {
  fetchEvents: fetchEvents,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home
