import { getProfile, setLoadingState, editUser, userError } from "../actions/userActionCreator";
import axios from "axios";
import { constructHeader, userFormat } from "../utils/userUtils";

export const fetchProfile = () => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.get(
    `${process.env.API_URL}/user/profile`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(getProfile(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const updateUser = (newUserUpdated) => async dispatch => {
  dispatch(setLoadingState(true));
  
  await axios.put(
    `${process.env.API_URL}/users`,
    userFormat(newUserUpdated),
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(editUser(data)))
  .catch((error) => dispatch(userError(error)))
  .finally(() => dispatch(setLoadingState(false))); 
};
