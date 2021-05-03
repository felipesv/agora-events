import { 
  SET_LOADING_STATE, GET_EVENTS,
  GET_EVENT_BY_ID, CREATE_EVENT,
  DELETE_EVENT
} from '../actions/eventActionTypes';

export const initialState = {
  events: [],
  loading: false,
  event: null
};

const eventReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case GET_EVENTS:
      return { ...state, events: action.data };
    case SET_LOADING_STATE:
      return { ...state, loading: action.loading };
    case GET_EVENT_BY_ID:
    case CREATE_EVENT:
      return { ...state, event: action.data };
    case DELETE_EVENT:
      return { ...state, event: null, success: action.data }
  }
};

export default eventReducer;
