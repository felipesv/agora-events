import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { signup } from "../services/authServices";
import '@stylesViews/SignUp.scss'
import '../mystyles.scss';
import { FaUserAlt, FaKey } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdTitle } from "react-icons/md";
import { isLoggedIn } from '../utils/authUtils';
import Swal from 'sweetalert2';


export const SignUp = (props) => {

  useEffect( () => {
    if (isLoggedIn()) location.href = '/';

    if (props.token) {
      localStorage.setItem("token", props.token);
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        confirmButtonColor: '#57d2b2',
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = '/';
        }
      })
    }

    if (props.error) Swal.fire({
      title: 'Error!',
      text: props.error.message,
      icon: 'error',
      confirmButtonColor: '#57d2b2',
    })
  }, [props.token,  props.error]);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signup(newUser);
  };

  return (
    <React.Fragment>
      <div className="is-flex is-align-items-center is-flex-direction-column py-6">
        <h1 className="title is-4 is-uppercase">Sign Up</h1>
      
        <form onSubmit={handleSubmit} className="form-width">
          {/* USERNAME */}
          <div className="mt-2">
            <label htmlFor="username" className="has-text-weight-bold">Username:</label>
            <div className="control has-icons-left">
              <input className="input" type="text" id='username' name="username" placeholder="Username" onChange={handleInputChange}/>
              <span className="icon is-left">
                <FaUserAlt/>
              </span>
            </div>
          </div>
          {/* PASSWORD */}
          <div className="mt-2">
            <label htmlFor="password" className="has-text-weight-bold">Password:</label>
            <div className="control has-icons-left">
              <input className="input" type="password" id="password" name="password" onChange={handleInputChange}/>
              <span className="icon is-left">
                <FaKey/>
              </span>
            </div>
          </div>
          {/* FIRSTNAME */}
          <div className="mt-2">
            <label htmlFor="firstName" className="has-text-weight-bold">First Name:</label>
            <div className="control has-icons-left">
              <input className="input" type="text" id="firstName" name="firstName" onChange={handleInputChange}/>
              <span className="icon is-left">
                <MdTitle/>
              </span>
            </div>
          </div>
          {/* LASTNAME */}
          <div className="mt-2">
            <label htmlFor="lastName" className="has-text-weight-bold">Last Name:</label>
            <div className="control has-icons-left">
              <input className="input" type="text" id="lastName" name="lastName" onChange={handleInputChange}/>
              <span className="icon is-left">
                <MdTitle/>
              </span>
            </div>
          </div>
          {/* EMAIL */}
          <div className="mt-2">
            <label htmlFor="email" className="has-text-weight-bold">Email:</label>
            <div className="control has-icons-left">
              <input className="input" type="email" id="email" name="email" onChange={handleInputChange}/>
              <span className="icon is-left">
                <HiOutlineMail/>
              </span>
            </div>
          </div>
          <div className="is-flex is-justify-content-center mt-4">
              <button type="submit" className="button is-primary mx-1">SIGN UP</button>
          </div>
        </form>
      </div>
    </React.Fragment>
    );
}

SignUp.defaultProps = {
  signup: () => {},
}

SignUp.propTypes = {
  signup: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error
  };
};

const mapDispatchToProps = {
  signup: signup,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignIn
