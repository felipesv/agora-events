import { AUTH_LOGIN, AUTH_REGISTER } from "../actions/authActionTypes";

export const initialState = {
  token: ""
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case AUTH_LOGIN:
      console.log("action AUTH_LOGIN was called");
      state.token = action.token.token;
      return state;
    case AUTH_REGISTER:
      return state;
  }
}

export default authReducer;