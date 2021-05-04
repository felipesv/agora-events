import React from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchProfile, updateUser } from "../services/userServices";
import '@stylesViews/Profile.scss';

export class Profile extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      modal: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleOpenModal(profile) {
    this.setState({
      modal: true,
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email
    })
  }

  handleCloseModal() {
    this.setState({
      modal: false
    })
    
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }) 
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state);
  }
  render() {
    if (this.props.profile)
      return(
      <React.Fragment>
        <h1>PROFILE</h1>
        <div> { this.props.profile.username } </div>
        <div> { this.props.profile.firstName } </div>
        <div> { this.props.profile.lastName } </div>
        <div> { this.props.profile.email } </div>
        <button onClick={() => this.handleOpenModal(this.props.profile)}>EDIT</button>
        
        <div className={this.state.modal ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className="box">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">username:</label>
                <input type="text" id='username' name="username" value={this.state.username} onChange={this.handleInputChange}/><br/><br/>
                <label htmlFor="firstName">firstname:</label>
                <input type="text" id='firstName' name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/><br/><br/>
                <label htmlFor="lastName">lastname:</label>
                <input type="text" id='lastName' name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/><br/><br/>
                <label htmlFor="email">email:</label>
                <input type="email" id='email' name="email" value={this.state.email} onChange={this.handleInputChange}/><br/><br/>
                <button type="submit" className="is-primary">UPDATE</button>
                { this.props.error ? <p>{ this.props.error.message }</p> : <></> }
              </form>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => this.handleCloseModal()}></button>
          </div>
      </React.Fragment>
      )
    return (<h1>NO PROFILE</h1>)
  }
}

Profile.defaultProps = {
	fetchProfile: () => {},
  updateUser: () => {}
};

Profile.propTypes = {
	fetchProfile: PropTypes.func,
  updateUser: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.user,
    error: state.user.error
  };
};

const mapDispatchToProps = {
  fetchProfile: fetchProfile,
  updateUser: updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
