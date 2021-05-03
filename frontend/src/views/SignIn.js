import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { login } from "../services/authServices";
import '@stylesViews/SignIn.scss'


export const SignIn = (props) => {

  useEffect( () => {
    if (props.token) localStorage.setItem("token", props.token)    
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
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="input" onChange={handleInputChange}/><br/><br/>
          </div>
          <div className="column">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="input" onChange={handleInputChange}/><br/><br/>
          </div>
        </div>
        <button type="submit" className="button is-danger">SIGN IN</button>
      </form>

      {props.error ? <p>{props.error.message}</p> : <></>}
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
