import { authLogin } from "../actions/authActionCreator";
import axios from "axios";

export const login = (credentials) => {
  
  return (dispatch) => {
    return axios.post(`${process.env.API_URL}/signin`, credentials)
    .then((res) => res.data)
    .then((token) => dispatch(authLogin(token)))
    .catch((error) => {console.log(error)});
  }
};
