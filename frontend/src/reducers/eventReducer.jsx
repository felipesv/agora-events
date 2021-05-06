import { 
  SET_LOADING_STATE, GET_EVENTS,
  GET_EVENT_BY_ID, CREATE_EVENT,
  DELETE_EVENT, GET_EVENTS_BY_AUTHOR,
  EDIT_EVENT,
  ADD_ATTENDANCE,
  EVENT_ERROR,
  DELETE_ATTENDANCE,
  ADD_RATING,
  DELETE_RATING
} from '../actions/eventActionTypes';

export const initialState = {
  events: [],
  loading: false,
  event: null,
  success: ""
};

const eventReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case GET_EVENTS:
    case GET_EVENTS_BY_AUTHOR:
      return { ...state, events: action.data };
    case SET_LOADING_STATE:
      return { ...state, loading: action.loading };
    case GET_EVENT_BY_ID:
    case CREATE_EVENT:
    case EDIT_EVENT:
      return { ...state, event: action.data, success: true, error: "" };
    case DELETE_EVENT:
      const newEvents = state.events.filter((event) => event._id !== action.data.idRemove);
      return { ...state, events: newEvents, success: action.data }
    case ADD_ATTENDANCE:
    case DELETE_ATTENDANCE:
    case ADD_RATING:
    case DELETE_RATING:
      return { ...state, events: newEvents, success: action.data }
    case EVENT_ERROR:
      return { ...state, error: action.error.response.data, success: "" }
  }
};

export default eventReducer;
