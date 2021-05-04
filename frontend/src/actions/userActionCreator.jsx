import { GET_PROFILE, SET_LOADING_STATE, EDIT_USER, USER_ERROR } from "./userActionType";


export const setLoadingState = (loading) => ({ 
  type: SET_LOADING_STATE, 
  loading : loading
});

export const getProfile = (data) => ({
  type: GET_PROFILE,
  data: data
});

export const editUser = (data) => ({
  type: EDIT_USER,
  data: data
});

export const userError = (error) => ({
  type: USER_ERROR,
  error: error
});
