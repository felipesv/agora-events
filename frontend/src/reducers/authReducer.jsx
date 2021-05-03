import { AUTH_LOGIN, AUTH_REGISTER, AUTH_ERROR } from "../actions/authActionTypes";

export const initialState = {
  token: ""
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case AUTH_LOGIN:
    case AUTH_REGISTER:
      return { ...state, token: action.token.token, error: '' };
    case AUTH_ERROR:
      return { ...state, error: action.error.response.data }
    
  }
}

export default authReducer;
