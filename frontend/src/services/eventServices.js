import { setLoadingState, getEvents } from "../actions/eventActionCreator";
import axios from "axios";
import { constructHeader } from "../utils/eventUtils";


export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return axios.get(
      `${process.env.API_URL}/events`,
      constructHeader()
    )
      .then((res) => res.data)
      .then((data) => dispatch(getEvents(data)))
      .catch((error) => {})
      .finally(() => dispatch(setLoadingState(false)));
  };
};
