import { setLoadingState, getEvents } from "../actions/eventActionCreator";
import axios from "axios";
import { constructHeader } from "../utils/eventUtils";

export const fetchEvents = () => async dispatch => {
  try {
    dispatch(setLoadingState(true));
    await axios.get(
      `${process.env.API_URL}/events`,
      constructHeader()
    )
      .then((res) => res.data)
      .then((data) => dispatch(getEvents(data)))
      .catch((error) => {})
      .finally(() => {
        dispatch(setLoadingState(false))}); 
  } catch (error) {
    console.error(error)
  }
};
