import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { signup } from "../services/authServices";
import '@stylesViews/SignUp.scss'
import '../mystyles.scss';


export const SignUp = (props) => {

  useEffect( () => {
    if (props.token) localStorage.setItem("token", props.token)    
  }, [props.token]);

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
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="firstName">First name:</label>
        <input type="text" id="firstName" name="firstName" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" name="lastName" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleInputChange}/><br/><br/>
        <button type="submit" className="is-primary">SIGN UP</button>
      </form>
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
    token: state.auth.token
  };
};

const mapDispatchToProps = {
  signup: signup,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignIn
