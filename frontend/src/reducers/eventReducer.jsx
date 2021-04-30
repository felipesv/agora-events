import { 
  SET_LOADING_STATE, GET_EVENTS
} from '../actions/eventActionTypes';

export const initialState = {
  events: [],
  loading: false,
}

const eventReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case GET_EVENTS:
      return { ...state, events: action.data };
    case SET_LOADING_STATE:
      return { ...state, loading: action.loading };
  }
}

export default eventReducer;
