import { SET_LOADING_STATE, GET_EVENTS} from './eventActionTypes';

export const setLoadingState = (loading) => 
  ({ type: SET_LOADING_STATE, loading });

export const getEvents = (data) => ({ type: GET_EVENTS , data });

export const fetchEvents = () => {
  console.log("iiiiii");
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch('http://localhost:5000/events')
      .then((res) => res.json())
      .then((data) => dispatch(getEvents(data)))
      .catch((error) => {})
      .finally(() => dispatch(setLoadingState(false)));
  };
};
