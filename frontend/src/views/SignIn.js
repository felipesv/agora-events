import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { login } from "../services/authServices";
import '@stylesViews/SignIn.scss';
import { FaUserAlt, FaKey } from "react-icons/fa";
import { isLoggedIn } from '../utils/authUtils';


export const SignIn = (props) => {

  useEffect( () => {
    if (props.token) localStorage.setItem("token", props.token)    
    if (isLoggedIn()) location.href = '/'
  }, [props.token]);

  const [credential, setCredential] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.login(credential);
    setTimeout(() => {
      location.href = '/';
    }, 1000);
  };

  return (
    <div className="is-flex is-align-items-center is-flex-direction-column py-6">
        <h1 className="title is-4 is-uppercase">Sign In</h1>
      
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
          <div className="is-flex is-justify-content-center mt-4">
              <button type="submit" className="button is-primary mx-1">SIGN IN</button>
          </div>
        </form>
      </div>
    );
}

SignIn.defaultProps = {
  login: () => {},
}

SignIn.propTypes = {
  login: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error
  };
};

const mapDispatchToProps = {
  login: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn
