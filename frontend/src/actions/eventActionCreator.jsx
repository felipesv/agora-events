import { SET_LOADING_STATE, GET_EVENTS, GET_EVENT_BY_ID,
  CREATE_EVENT } from './eventActionTypes';

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
