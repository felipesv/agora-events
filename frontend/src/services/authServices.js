import { authLogin, authSignup, authError } from "../actions/authActionCreator";
import axios from "axios";

export const login = (credentials) => async dispatch => {
  await axios.post(
    `${process.env.API_URL}/signin`,
    credentials
  )
  .then((res) => res.data)
  .then((token) => dispatch(authLogin(token)))
  .catch((error) => dispatch(authError(error)));
};

export const signup = (newUser) => async dispatch => {  
  await axios.post(
    `${process.env.API_URL}/signup`,
    newUser
  )
  .then((res) => res.data)
  .then((token) => dispatch(authSignup(token)))
  .catch((error) => dispatch(authError(error)));
};
