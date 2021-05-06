import React from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { fetchProfile, updateUser } from "../services/userServices";
import '@stylesViews/Profile.scss';
import { FaUserAlt, FaKey } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdTitle } from "react-icons/md";
import { isLoggedIn } from '../utils/authUtils';
import Swal from 'sweetalert2';

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

    if (!isLoggedIn())
      location.href = '/';
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      Swal.fire({
        title: 'Error!',
        text: props.error.message,
        icon: 'error',
        confirmButtonColor: '#57d2b2',
      })
    }
    if (prevProps.success !== this.props.success) {
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        confirmButtonColor: '#57d2b2',
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/profile';
        }
      });
    }
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
        <div className="is-flex is-align-items-center is-flex-direction-column py-6">
          <div className="is-flex is-justify-content-center my-6">
            <h1 className="title is-4 is-uppercase">Profile</h1>
          </div>
          <div className="card card-width-profile">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <div className="is-flex is-justify-content-center is-align-items-center">
                    <h3 className="title is-6">Username:</h3>&nbsp;{ this.props.profile.username }
                  </div>
                  <div className="is-flex is-justify-content-center is-align-items-center">
                    <h3 className="title is-6">First Name:</h3>&nbsp;{ this.props.profile.firstName } 
                  </div>
                  <div className="is-flex is-justify-content-center is-align-items-center">
                    <h3 className="title is-6">Last Name:</h3>&nbsp;{ this.props.profile.lastName }
                  </div>
                  <div className="is-flex is-justify-content-center is-align-items-center">
                    <h3 className="title is-6">Email:</h3>&nbsp;{ this.props.profile.email }
                  </div>
                </div>
              </div>
              <div className="is-flex is-justify-content-center is-align-items-center">
                  <button className="button is-primary" onClick={() => this.handleOpenModal(this.props.profile)}>EDIT</button>
                </div>
            </div>
          </div>
          
          <div className={this.state.modal ? "modal is-active" : "modal"}>
              <div className="modal-background"></div>
              <div className="modal-content">
                <div className="box">
                  <form onSubmit={this.handleSubmit}>
                    {/* USERNAME */}
                    <div className="mt-2">
                      <label htmlFor="username" className="has-text-weight-bold">Username:</label>
                      <div className="control has-icons-left">
                        <input className="input" type="text" id='username' name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
                        <span className="icon is-left">
                          <FaUserAlt/>
                        </span>
                      </div>
                    </div>
                    {/* FIRSTNAME */}
                    <div className="mt-2">
                      <label htmlFor="firstName" className="has-text-weight-bold">First Name:</label>
                      <div className="control has-icons-left">
                        <input className="input" type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                        <span className="icon is-left">
                          <MdTitle/>
                        </span>
                      </div>
                    </div>
                    {/* LASTNAME */}
                    <div className="mt-2">
                      <label htmlFor="lastName" className="has-text-weight-bold">Last Name:</label>
                      <div className="control has-icons-left">
                        <input className="input" type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                        <span className="icon is-left">
                          <MdTitle/>
                        </span>
                      </div>
                    </div>
                    {/* EMAIL */}
                    <div className="mt-2">
                      <label htmlFor="email" className="has-text-weight-bold">Email:</label>
                      <div className="control has-icons-left">
                        <input className="input" type="email" id="email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                        <span className="icon is-left">
                          <HiOutlineMail/>
                        </span>
                      </div>
                    </div>
                    <div className="is-flex is-justify-content-center mt-4">
                        <button type="submit" className="button is-primary mx-1">UPDATE</button>
                        <button type="button" className="button is-danger mx-1" onClick={() => this.handleCloseModal()}>CANCEL</button>
                    </div>
                  </form>
                </div>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={() => this.handleCloseModal()}></button>
            </div>
        </div>
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
    error: state.user.error,
    success: state.user.success
  };
};

const mapDispatchToProps = {
  fetchProfile: fetchProfile,
  updateUser: updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
