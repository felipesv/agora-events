import { SET_LOADING_STATE, GET_EVENTS, GET_EVENT_BY_ID,
  CREATE_EVENT, GET_EVENTS_BY_AUTHOR, DELETE_EVENT,
  EDIT_EVENT
} from './eventActionTypes';

export const setLoadingState = (loading) => ({ 
  type: SET_LOADING_STATE, 
  loading : loading
});

export const getEvents = (data) => ({
  type: GET_EVENTS,
  data: data
});

export const getEventById = (data) => ({
  type: GET_EVENT_BY_ID,
  data: data
});

export const createEvent = (data) => ({
  type: CREATE_EVENT,
  data: data
});

export const deleteEventById = (data) => ({
  type: DELETE_EVENT,
  data: data
});

export const getEventsByAuthor = (data) => ({
  type: GET_EVENTS_BY_AUTHOR,
  data: data
});

export const editEvent = (data) => ({
  type: EDIT_EVENT,
  data: data
});
