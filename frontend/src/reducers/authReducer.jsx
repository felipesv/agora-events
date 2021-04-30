import { AUTH_LOGIN, AUTH_REGISTER } from "../actions/authActionTypes";

export const initialState = {
  token: ""
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case AUTH_LOGIN:
      state.token = action.token.token;
      return { ...state, token: action.token.token };
    case AUTH_REGISTER:
      return state;
  }
}

export default authReducer;