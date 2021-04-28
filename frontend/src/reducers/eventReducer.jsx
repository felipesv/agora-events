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
      console.log("action GET_EVENT was called");
      state.events = action.data;
      return state;
    case SET_LOADING_STATE:
      state.loading = action.loading;
      return state;
  }
}

export default eventReducer;
