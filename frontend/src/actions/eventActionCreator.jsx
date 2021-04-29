import { SET_LOADING_STATE, GET_EVENTS} from './eventActionTypes';

export const setLoadingState = (loading) => ({ 
  type: SET_LOADING_STATE, 
  loading : loading
});

export const getEvents = (data) => ({
  type: GET_EVENTS,
  data: data
});
