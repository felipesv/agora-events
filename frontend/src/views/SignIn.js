import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import { login } from "../services/authServices";
import '@stylesViews/SignIn.scss'
import '../mystyles.scss';


export const SignIn = (props) => {
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
  const handleSubmit = (event) => {
    event.preventDefault();
    props.login(credential);
    localStorage.setItem("token", props.token)
  };
  
  return (
    
    <React.Fragment>
      {console.log("======ENTRO RETURN PROPS TOKEN=====", props.token)}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">First name:</label>
        <input type="text" id="username" name="username" onChange={handleInputChange}/><br/><br/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleInputChange}/><br/><br/>
        <button type="submit" className="is-primary">SIGN IN</button>
      </form>

    </React.Fragment>
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
    token: state.token
  };
};

const mapDispatchToProps = {
  login: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn
